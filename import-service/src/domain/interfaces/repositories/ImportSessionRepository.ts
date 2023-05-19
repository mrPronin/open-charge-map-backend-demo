import { ImportSession } from '@domain/models/import/ImportSession.js'
import { CoreReferenceData } from '@domain/models/ocm/CoreReferenceData.js';
import { POI } from '@domain/models/ocm/POI.js';

export interface ImportSessionRepository {
  persistOCM(
    referenceData: CoreReferenceData,
    pois: POI[],
    isFirstSession: Boolean,
    modifiedsince: Date,
    startDate: Date
  ): Promise<ImportSession>;
  getAll(): Promise<ImportSession[]>;
  isEmpty(): Promise<Boolean>;
}
