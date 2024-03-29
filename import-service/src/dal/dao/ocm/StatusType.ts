import mongoose, { Document, Schema } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import { StatusType as IStatusType } from '@domain/models/ocm/StatusType.js';

interface StatusTypeDocument extends IStatusType, Document {
  _id: string;
}

export const StatusTypeSchema = new Schema<StatusTypeDocument>(
  {
    _id: { type: String, default: uuidv4 },
    IsOperational: { type: Boolean, required: false, default: false },
    IsUserSelectable: { type: Boolean, required: false, default: false },
    ID: { type: Number, required: true },
    Title: { type: String, required: true, default: '' },
  },
  { _id: false }
);

export const StatusTypeModel = mongoose.model<StatusTypeDocument>(
  'StatusType',
  StatusTypeSchema
);
