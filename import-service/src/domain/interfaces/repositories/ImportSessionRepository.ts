import { ImportSession } from '@domain/models/presentation/ImportSession.js'
import { CoreReferenceData } from '@domain/models/ocm/CoreReferenceData.js';
import { POI } from '@domain/models/ocm/POI.js';

export interface ImportSessionRepository {
  persistOCM(
    referenceData: CoreReferenceData,
    pois: POI[],
    modifiedsince: Date,
    startDate: Date
  ): Promise<ImportSession>;
  loadPOIFromFile(
    path: string,
    referenceData: CoreReferenceData,
    startDate: Date
  ): Promise<ImportSession>;

  getAll(): Promise<ImportSession[]>;
  isEmpty(): Promise<Boolean>;
  cleanUp(): Promise<void>;
}
