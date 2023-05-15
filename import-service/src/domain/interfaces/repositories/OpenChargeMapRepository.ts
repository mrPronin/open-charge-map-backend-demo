import { POI } from '../../models/ocm/POI.js';
import { CoreReferenceData } from "../../models/ocm/CoreReferenceData.js";

export interface IOpenChargeMapRepository {
  getReferenceData(): Promise<CoreReferenceData>;
  getPOI(modifiedSince?: Date): Promise<POI[]>;
}
