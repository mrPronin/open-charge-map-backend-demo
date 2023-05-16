import mongoose, { Document, Schema } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import { StatusType as IStatusType } from '@domain/models/ocm/StatusType.js';

interface StatusTypeDocument extends IStatusType, Document {
  _id: string;
}

export const StatusTypeSchema = new Schema<StatusTypeDocument>(
  {
    _id: { type: String, default: uuidv4 },
    IsOperational: Boolean,
    IsUserSelectable: Boolean,
    ID: Number,
    Title: String,
  },
  { _id: false }
);

const StatusType = mongoose.model<StatusTypeDocument>(
  'StatusType',
  StatusTypeSchema
);

export default StatusType;
