import mongoose, { Document, Schema } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import { ConnectionType as IConnectionType } from '@domain/models/ocm/ConnectionType.js';

interface ConnectionTypeDocument extends IConnectionType, Document {
  _id: string;
}

export const ConnectionTypeSchema = new Schema<ConnectionTypeDocument>(
  {
    _id: { type: String, default: uuidv4 },
    FormalName: { type: String, required: false, default: null },
    IsDiscontinued: { type: Boolean, required: false, default: false },
    IsObsolete: { type: Boolean, required: false, default: false },
    ID: {
      type: Number,
      required: true,
      index: true,
    },
    Title: { type: String, required: false },
  },
  { _id: false }
);

export const ConnectionTypeModel = mongoose.model<ConnectionTypeDocument>(
  'ConnectionType',
  ConnectionTypeSchema
);
