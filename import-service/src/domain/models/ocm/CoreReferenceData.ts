import { LevelType } from './LevelType.js';
import { ConnectionType } from './ConnectionType.js';
import { Country } from './Country.js';
import { OperatorInfo } from './OperatorInfo.js';
import { StatusType } from './StatusType.js';

export interface CoreReferenceData {
  ChargerTypes: LevelType[];
  ConnectionTypes: ConnectionType[];
  Countries: Country[];
  Operators: OperatorInfo[];
  StatusTypes: StatusType[];
}
