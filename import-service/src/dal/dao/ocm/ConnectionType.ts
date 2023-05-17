import mongoose, { Document, Schema } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import { ConnectionType as IConnectionType } from '@domain/models/ocm/ConnectionType.js';

interface ConnectionTypeDocument extends IConnectionType, Document {
  _id: string;
}

export const ConnectionTypeSchema = new Schema<ConnectionTypeDocument>(
  {
    _id: { type: String, default: uuidv4 },
    FormalName: String,
    IsDiscontinued: Boolean,
    IsObsolete: Boolean,
    ID: {
      type: Number,
      required: true,
      index: true,
    },
    Title: String,
  },
  { _id: false }
);

export const ConnectionTypeModel = mongoose.model<ConnectionTypeDocument>(
  'ConnectionType',
  ConnectionTypeSchema
);