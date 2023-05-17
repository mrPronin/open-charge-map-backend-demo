import { injectable, inject } from 'inversify';
import mongoose from 'mongoose';
import { POI } from '@domain/models/ocm/POI.js';
import { CoreReferenceData } from '@domain/models/ocm/CoreReferenceData.js';
import { OCMPersistenceRepository } from '@domain/interfaces/repositories/OCMPersistenceRepository.js';
import { LevelTypeModel } from '@dal/dao/ocm/LevelType.js';
import { POIModel } from '@dal/dao/ocm/POI.js';
import { ConnectionTypeModel } from '@dal/dao/ocm/ConnectionType.js';
import { CountryModel } from '@dal/dao/ocm/Country.js';
import { OperatorInfoModel } from '@dal/dao/ocm/OperatorInfo.js';
import { StatusTypeModel } from '@dal/dao/ocm/StatusType.js';

// debug
import * as mockPOIData from '@presentation/mocked/openchargemap-poi-compact.json';
// debug

@injectable()
export class OCMPersistenceRepositoryImplementation
  implements OCMPersistenceRepository
{
  storeReferenceData = async (data: CoreReferenceData): Promise<void> => {
    const { ChargerTypes, ConnectionTypes, Countries, Operators, StatusTypes } =
      data;
    await processModel(LevelTypeModel, ChargerTypes);
    await processModel(ConnectionTypeModel, ConnectionTypes);
    await processModel(CountryModel, Countries);
    await processModel(OperatorInfoModel, Operators);
    await processModel(StatusTypeModel, StatusTypes);
  };

  storePOIs = async (pois: POI[]): Promise<void> => {
    // for (const poi of pois) {
    //   const poiDocument = new POIModel(poi);
    // await poiDocument.save();
    // }
  };

  getLastPOIUpdate = async (): Promise<Date | null> => {
    if (mockPOIData.length === 0) {
      return null;
    }
    return mockPOIData
      .map((poi) => new Date(poi.DateLastStatusUpdate))
      .reduce((a, b) => (a > b ? a : b));

    const poiDocument = await POIModel.findOne().sort('-DateLastStatusUpdate');
    return poiDocument ? poiDocument.toObject() : null;
  };
}

async function processModel<T>(model: mongoose.Model<any>, data: T[]) {
  await model.deleteMany();
  await model.bulkSave(data.map((item) => new model(item)));
}
