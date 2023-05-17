import { POI } from '@domain/models/ocm/POI.js';
import { CoreReferenceData } from '@domain/models/ocm/CoreReferenceData.js';

export interface OCMPersistenceRepository {
  storeReferenceData(data: CoreReferenceData): Promise<void>;
  storePOIs(pois: POI[]): Promise<void>;
  getLastPOIUpdate(): Promise<Date | null>;
}
