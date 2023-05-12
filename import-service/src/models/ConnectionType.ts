import mongoose, { Document, Schema } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

export interface IConnectionType extends Document {
  _id: string;
  FormalName: string;
  IsDiscontinued: boolean;
  IsObsolete: boolean;
  ID: number;
  Title: string;
}

export const ConnectionTypeSchema = new Schema<IConnectionType>(
  {
    _id: { type: String, default: uuidv4 },
    FormalName: String,
    IsDiscontinued: Boolean,
    IsObsolete: Boolean,
    ID: Number,
    Title: String,
  },
  { _id: false }
);

const ConnectionType = mongoose.model<IConnectionType>(
  'ConnectionType',
  ConnectionTypeSchema
);

export default ConnectionType;
