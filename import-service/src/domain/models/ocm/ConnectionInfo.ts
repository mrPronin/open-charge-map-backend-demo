import { StatusType } from "./StatusType.js";
import { ConnectionType } from "./ConnectionType.js";
import { LevelType } from "./LevelType.js";
import { SupplyType } from "./SupplyType.js";

export interface ConnectionInfo {
  _id: string;
  ID: number;
  ConnectionTypeID: number;
  ConnectionType: ConnectionType;
  Reference: string;
  StatusTypeID: number;
  StatusType: StatusType;
  LevelID: number;
  Level: LevelType;
  Amps: number;
  Voltage: number;
  PowerKW: number;
  CurrentTypeID: number;
  CurrentType: SupplyType;
  Quantity: number;
  Comments: string;
}
