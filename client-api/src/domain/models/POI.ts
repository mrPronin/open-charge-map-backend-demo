/* eslint-disable unicorn/filename-case */
import { OperatorInfo } from './OperatorInfo.js';
import { StatusType } from './StatusType.js';
import { AddressInfo } from './AddressInfo.js';
import { ConnectionInfo } from './ConnectionInfo.js';

export interface POI {
  ID: number;
  UUID: string;
  OperatorID: number;
  OperatorInfo?: OperatorInfo;
  StatusTypeID: number;
  StatusType?: StatusType;
  AddressInfo?: AddressInfo;
  Connections: ConnectionInfo[];
  DateLastStatusUpdate?: Date;
}
