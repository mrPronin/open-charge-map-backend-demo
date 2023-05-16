import mongoose, { Document, Schema } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

import { ConnectionTypeSchema } from "./ConnectionType.js";
import { StatusTypeSchema } from "./StatusType.js";
import { LevelTypeSchema } from "./LevelType.js";
import { SupplyTypeSchema } from "./SupplyType.js";
import { ConnectionInfo as IConnectionInfo } from '@domain/models/ocm/ConnectionInfo.js';

interface ConnectionInfoDocument extends IConnectionInfo, Document {
  _id: string;
}

export const ConnectionInfoSchema = new Schema<ConnectionInfoDocument>(
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

const ConnectionInfo = mongoose.model<ConnectionInfoDocument>(
  'ConnectionInfo',
  ConnectionInfoSchema
);

export default ConnectionInfo;
