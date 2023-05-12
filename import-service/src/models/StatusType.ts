import mongoose, { Document, Schema } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

export interface IStatusType extends Document {
  _id: string;
  IsOperational: boolean;
  IsUserSelectable: boolean;
  ID: number;
  Title: string;
}

export const StatusTypeSchema = new Schema<IStatusType>(
  {
    _id: { type: String, default: uuidv4 },
    IsOperational: Boolean,
    IsUserSelectable: Boolean,
    ID: Number,
    Title: String,
  },
  { _id: false }
);

const StatusType = mongoose.model<IStatusType>(
  'StatusType',
  StatusTypeSchema
);

export default StatusType;
