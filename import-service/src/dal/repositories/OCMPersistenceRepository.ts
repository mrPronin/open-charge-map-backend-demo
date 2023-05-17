import { injectable, inject } from 'inversify';
import { POI } from '@domain/models/ocm/POI.js';
import { CoreReferenceData } from '@domain/models/ocm/CoreReferenceData.js';
import { OCMPersistenceRepository } from '@domain/interfaces/repositories/OCMPersistenceRepository.js';
import { POIModel } from '@dal/dao/ocm/POI.js';

// debug
import * as mockPOIData from '@presentation/mocked/openchargemap-poi-compact.json';
// debug

@injectable()
export class OCMPersistenceRepositoryImplementation
  implements OCMPersistenceRepository
{
  storeCoreReferenceData = async (data: CoreReferenceData): Promise<void> => {
    const { ChargerTypes, ConnectionTypes, Countries, Operators, StatusTypes } =
      data;
    console.log(
      ChargerTypes,
      ConnectionTypes,
      Countries,
      Operators,
      StatusTypes
    );
    // TODO: store reference data
    // const coreReferenceDataDocument = new CoreReferenceDataModel(data);
    // await coreReferenceDataDocument.save();
  };

  storePOIs = async (pois: POI[]): Promise<void> => {
    // for (const poi of pois) {
    //   const poiDocument = new POIModel(poi);
    //   await poiDocument.save();
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
