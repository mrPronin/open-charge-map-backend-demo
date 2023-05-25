import mongoose from 'mongoose';
import { injectable, inject } from 'inversify';
import fs from 'fs';
import StreamArray from 'stream-json/streamers/StreamArray';
import { TYPES } from '@domain/types.js';
import { CONSTANTS } from '@domain/constants.js';
import {
  ImportSession,
  ImportSessionInput,
} from '@domain/models/presentation/ImportSession.js';
import { ImportSessionRepository } from '@domain/interfaces/repositories/ImportSessionRepository.js';
import { OCMPersistenceRepository } from '@domain/interfaces/repositories/OCMPersistenceRepository.js';
import { CoreReferenceData } from '@domain/models/ocm/CoreReferenceData.js';
import { POI } from '@domain/models/ocm/POI.js';
import { ImportSessionModel } from '@dal/dao/import/ImportSession.js';

@injectable()
// eslint-disable-next-line prettier/prettier
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
  ): Promise<ImportSession | null> => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
      await this.ocmPersistenceRepository.storeReferenceData(referenceData);

      let counter = 0;
      let batchCounter = 0;
      const pipeline = fs.createReadStream(path).pipe(StreamArray.withParser());
      let poiBuffer: POI[] = [];

      pipeline.on('data', async (poiItemData) => {
        counter += 1;
        poiBuffer.push(poiItemData.value);
        if (poiBuffer.length === CONSTANTS.POI_BATCH_PERSIST_AMOUNT) {
          batchCounter += 1;
          pipeline.pause();
          const memoryUsage = Math.round(
            process.memoryUsage().heapUsed / 1024 / 1024
          );
          await this.ocmPersistenceRepository.storePOIs(poiBuffer);
          console.log(
            `Buffer: ${batchCounter} items saved: ${counter}. Memory usage: ${memoryUsage} Mb`
          );
          poiBuffer = [];
          pipeline.resume();
        }
      });

      return new Promise<ImportSession>((resolve, reject) => {
        pipeline.on('end', async () => {
          counter += 1;
          await this.ocmPersistenceRepository.storePOIs(poiBuffer);
          const memoryUsage = Math.round(
            process.memoryUsage().heapUsed / 1024 / 1024
          );
          console.log(
            `Items saved: ${counter} memory usage: ${memoryUsage} Mb`
          );
          const endDate = new Date();
          const importSession: ImportSessionInput = {
            poiAmount: counter,
            modifiedsince: endDate,
            startDate,
            endDate,
          };
          const document = new ImportSessionModel(importSession);
          await document.save();
          await session.commitTransaction();
          session.endSession();
          resolve(this.toModel<ImportSession>(document));
        });
        mongoose.connection.on('error', (err) => {
          reject(err);
        });
      });
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      throw error;
    }
  };

  persistOCM = async (
    referenceData: CoreReferenceData,
    pois: POI[],
    modifiedsince: Date | null,
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
        modifiedsince: modifiedsince || endDate,
        startDate,
        endDate,
      });
      await document.save();
      await session.commitTransaction();
      session.endSession();
      return this.toModel<ImportSession>(document);
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
    return importSessionDocuments.map((doc) =>
      this.toModel<ImportSession>(doc)
    );
  };

  cleanUp = async (): Promise<void> => {
    await ImportSessionModel.deleteMany();
  };

  private toModel<T>(doc: mongoose.Document): T {
    const object = doc.toObject() as T & {
      _id: string;
      ID: string;
    };
    object.ID = doc.id;
    // eslint-disable-next-line no-underscore-dangle
    delete object._id;
    return object as T;
  }
}
