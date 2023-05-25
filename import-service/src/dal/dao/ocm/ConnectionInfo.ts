import mongoose, { Document, Schema } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import { ConnectionInfo as IConnectionInfo } from '@domain/models/ocm/ConnectionInfo.js';

import { ConnectionTypeSchema } from './ConnectionType.js';
import { StatusTypeSchema } from './StatusType.js';
import { SupplyTypeSchema } from './SupplyType.js';

interface ConnectionInfoDocument extends IConnectionInfo, Document {
  _id: string;
}

export const ConnectionInfoSchema = new Schema<ConnectionInfoDocument>(
  {
    _id: { type: String, default: uuidv4 },
    ID: { type: Number, required: true },
    ConnectionTypeID: { type: Number, required: false, default: null },
    ConnectionType: { type: ConnectionTypeSchema, required: false },
    Reference: { type: String, required: false },
    StatusTypeID: { type: Number, required: false, default: 0 },
    StatusType: { type: StatusTypeSchema, required: false },
    Amps: { type: Number, required: false, default: null },
    Voltage: { type: Number, required: false, default: null },
    PowerKW: { type: Number, required: false, default: null },
    CurrentTypeID: { type: Number, required: false, default: null },
    CurrentType: { type: SupplyTypeSchema, required: false },
    Quantity: { type: Number, required: false, default: null },
    Comments: { type: String, required: false, default: null },
  },
  { _id: false }
);

export const ConnectionInfoModel = mongoose.model<ConnectionInfoDocument>(
  'ConnectionInfo',
  ConnectionInfoSchema
);
