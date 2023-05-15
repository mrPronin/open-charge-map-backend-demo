import mongoose, { Document, Schema } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

export interface ISupplyType extends Document {
  _id: string;
  ID: number;
  Title: string;
}

export const SupplyTypeSchema = new Schema<ISupplyType>(
  {
    _id: { type: String, default: uuidv4 },
    ID: Number,
    Title: String,
  },
  { _id: false }
);

const SupplyType = mongoose.model<ISupplyType>('SupplyType', SupplyTypeSchema);

export default SupplyType;
