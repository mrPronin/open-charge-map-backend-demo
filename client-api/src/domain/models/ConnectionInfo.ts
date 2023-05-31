import { StatusType } from './StatusType.js';
import { ConnectionType } from './ConnectionType.js';
import { SupplyType } from './SupplyType.js';

export interface ConnectionInfo {
  ID: number;
  ConnectionTypeID?: number | null;
  ConnectionType?: ConnectionType | null;
  Reference?: string | null;
  StatusTypeID?: number | null;
  StatusType?: StatusType | null;
  Amps?: number | null;
  Voltage?: number | null;
  PowerKW?: number | null;
  CurrentTypeID?: number | null;
  CurrentType?: SupplyType | null;
  Quantity?: number | null;
  Comments?: string | null;
}
