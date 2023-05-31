import { OperatorInfo } from './OperatorInfo.js';
import { StatusType } from './StatusType.js';
import { AddressInfo } from './AddressInfo.js';
import { ConnectionInfo } from './ConnectionInfo.js';

export interface POI {
  id: string;
  ID: number;
  UUID: string;
  OperatorInfo?: OperatorInfo | null;
  StatusType?: StatusType | null;
  AddressInfo?: AddressInfo | null;
  Connections: ConnectionInfo[];
  DateLastStatusUpdate?: Date | null;
}
