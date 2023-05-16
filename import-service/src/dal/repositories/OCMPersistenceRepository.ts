import { POI } from '@domain/models/ocm/POI.js';
import { CoreReferenceData } from '@domain/models/ocm/CoreReferenceData.js';
import { OCMPersistenceRepository } from '@domain/interfaces/repositories/OCMPersistenceRepository.js';
import { POIModel } from '@dal/dao/ocm/POI.js';


export class OCMPersistenceRepositoryImplementation
  implements OCMPersistenceRepository
{
  storeCoreReferenceData = async (data: CoreReferenceData): Promise<void> => {
    const { ChargerTypes, ConnectionTypes, Countries, Operators, StatusTypes } = data;
    console.log(ChargerTypes, ConnectionTypes, Countries, Operators, StatusTypes);
    // TODO: store reference data
    // const coreReferenceDataDocument = new CoreReferenceDataModel(data);
    // await coreReferenceDataDocument.save();
  };

  storePOIs = async (pois: POI[]): Promise<void> => {
    for (const poi of pois) {
      const poiDocument = new POIModel(poi);
      await poiDocument.save();
    }
  };

  getLastPOIUpdate = async (): Promise<POI | null> => {
    const poiDocument = await POIModel.findOne().sort('-DateLastStatusUpdate');
    return poiDocument ? poiDocument.toObject() : null;
  };
}