import { ConnectionType } from './ConnectionType.js';
import { Country } from './Country.js';
import { OperatorInfo } from './OperatorInfo.js';
import { StatusType } from './StatusType.js';
import { SupplyType } from "./SupplyType.js";

export interface CoreReferenceData {
  ConnectionTypes: ConnectionType[];
  Countries: Country[];
  Operators: OperatorInfo[];
  StatusTypes: StatusType[];
  CurrentTypes: SupplyType[];
}
