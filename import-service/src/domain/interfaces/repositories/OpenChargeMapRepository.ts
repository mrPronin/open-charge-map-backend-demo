import { POI } from '../../models/ocm/POI.js';
import { CoreReferenceData } from "../../models/ocm/CoreReferenceData.js";

export interface OpenChargeMapRepository {
  getReferenceData(): Promise<CoreReferenceData>;
  getPOI(modifiedSince?: Date): Promise<POI[]>;
}
