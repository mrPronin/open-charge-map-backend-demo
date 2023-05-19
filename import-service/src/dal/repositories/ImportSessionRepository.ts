import mongoose from 'mongoose';
import { injectable, inject } from 'inversify';
import fs from "fs";
import StreamArray from 'stream-json/streamers/StreamArray';
import { TYPES } from '@domain/types.js';
import { ImportSession } from '@domain/models/presentation/ImportSession.js';
import { ImportSessionRepository } from '@domain/interfaces/repositories/ImportSessionRepository.js';
import { OCMPersistenceRepository } from '@domain/interfaces/repositories/OCMPersistenceRepository.js';
import { CoreReferenceData } from '@domain/models/ocm/CoreReferenceData.js';
import { POI } from '@domain/models/ocm/POI.js';
import { ImportSessionModel } from '@dal/dao/import/ImportSession.js';

@injectable()
export class ImportSessionRepositoryImplementation
  implements ImportSessionRepository
{
  constructor(
    @inject(TYPES.OCMPersistenceRepository)
    private readonly ocmPersistenceRepository: OCMPersistenceRepository
  ) {}

  loadPOIFromFile = async (
    path: string,
    referenceData: CoreReferenceData,
    startDate: Date
  ): Promise<ImportSession> => {

    let counter = 0;
    const pipeline = fs.createReadStream(path).pipe(StreamArray.withParser());
    pipeline.on('data', (data) => {
      ++counter;
    });
    pipeline.on('end', () => {
      ++counter;
      console.log('counter: ', counter);
    });
    // debug
    return {
      ID: '',
      poiAmount: 0,
      modifiedsince: new Date(),
      startDate: new Date(),
      endDate: new Date(),
    };
    // debug
  };

  persistOCM = async (
    referenceData: CoreReferenceData,
    pois: POI[],
    modifiedsince: Date,
    startDate: Date
  ): Promise<ImportSession> => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
      await this.ocmPersistenceRepository.storeReferenceData(referenceData);
      await this.ocmPersistenceRepository.storePOIs(pois);
      const endDate = new Date();
      const document = new ImportSessionModel({
        poiAmount: pois.length,
        modifiedsince: modifiedsince,
        startDate,
        endDate,
      });
      await document.save();
      await session.commitTransaction();
      session.endSession();
      return toModel<ImportSession>(document);
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      throw error;
    }
  };

  isEmpty = async (): Promise<Boolean> => {
    return (await ImportSessionModel.count()) === 0;
  };

  getAll = async (): Promise<ImportSession[]> => {
    const importSessionDocuments = await ImportSessionModel.find();
    return importSessionDocuments.map((doc) => toModel<ImportSession>(doc));
  };

  cleanUp = async (): Promise<void> => {
    await ImportSessionModel.deleteMany();
  };
}

function toModel<T>(doc: mongoose.Document): T {
  const object = doc.toObject() as T & {
    _id: string;
    ID: string;
  };
  object.ID = doc.id;
  delete object['_id'];
  return object as T;
}
