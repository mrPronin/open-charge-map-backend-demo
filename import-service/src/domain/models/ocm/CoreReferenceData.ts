import {
  SupplyType,
  StatusType,
  OperatorInfo,
  Country,
  ConnectionType,
} from './index.js';

export interface CoreReferenceData {
  ConnectionTypes: ConnectionType[];
  Countries: Country[];
  Operators: OperatorInfo[];
  StatusTypes: StatusType[];
  CurrentTypes: SupplyType[];
}
