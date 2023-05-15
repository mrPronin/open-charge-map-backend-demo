import { OperatorInfo } from "./OperatorInfo.js";
import { StatusType } from "./StatusType.js";
import { AddressInfo } from "./AddressInfo.js";
import { ConnectionInfo } from "./ConnectionInfo.js";

export interface POI {
  ID: number;
  UUID: string;
  OperatorInfo: OperatorInfo;
  StatusType: StatusType;
  AddressInfo: AddressInfo;
  Connections: ConnectionInfo[];
  DateLastStatusUpdate?: Date;
}
