import { POI } from '@domain/models/ocm/POI.js';
import { CoreReferenceData } from "@domain/models/ocm/CoreReferenceData.js";

export interface OpenChargeMapRepository {
  getReferenceData(): Promise<CoreReferenceData>;
  getPOI(modifiedSince?: Date): Promise<POI[]>;
}
