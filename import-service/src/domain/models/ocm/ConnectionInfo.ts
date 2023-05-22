import { StatusType } from "./StatusType.js";
import { ConnectionType } from "./ConnectionType.js";
import { SupplyType } from "./SupplyType.js";

export interface ConnectionInfo {
  ID: number;
  ConnectionTypeID?: number;
  ConnectionType?: ConnectionType;
  Reference?: string;
  StatusTypeID?: number;
  StatusType?: StatusType;
  Amps?: number;
  Voltage?: number;
  PowerKW?: number;
  CurrentTypeID?: number;
  CurrentType?: SupplyType;
  Quantity?: number;
  Comments?: string;
}
