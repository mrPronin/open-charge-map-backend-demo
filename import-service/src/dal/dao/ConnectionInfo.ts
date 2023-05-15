import mongoose, { Document, Schema } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

import { IConnectionType, ConnectionTypeSchema } from "./ConnectionType.js";
import { IStatusType, StatusTypeSchema } from "./StatusType.js";
import { ILevelType, LevelTypeSchema } from "./LevelType.js";
import { ISupplyType, SupplyTypeSchema } from "./SupplyType.js";

export interface IConnectionInfo extends Document {
  _id: string;
  ID: number;
  ConnectionTypeID: number;
  ConnectionType: IConnectionType;
  Reference: string;
  StatusTypeID: number;
  StatusType: IStatusType;
  LevelID: number;
  Level: ILevelType;
  Amps: number;
  Voltage: number;
  PowerKW: number;
  CurrentTypeID: number;
  CurrentType: ISupplyType;
  Quantity: number;
  Comments: string;
}
export const ConnectionInfoSchema = new Schema<IConnectionInfo>(
  {
    _id: { type: String, default: uuidv4 },
    ID: Number,
    ConnectionTypeID: Number,
    ConnectionType: ConnectionTypeSchema,
    Reference: String,
    StatusTypeID: Number,
    StatusType: StatusTypeSchema,
    LevelID: Number,
    Level: LevelTypeSchema,
    Amps: Number,
    Voltage: Number,
    PowerKW: Number,
    CurrentTypeID: Number,
    CurrentType: SupplyTypeSchema,
    Quantity: Number,
    Comments: String,
  },
  { _id: false }
);

const ConnectionInfo = mongoose.model<IConnectionInfo>(
  'ConnectionInfo',
  ConnectionInfoSchema
);

export default ConnectionInfo;
