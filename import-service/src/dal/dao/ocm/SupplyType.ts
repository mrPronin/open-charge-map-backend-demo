import mongoose, { Document, Schema } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import { SupplyType as ISupplyType } from '../../../domain/models/ocm/SupplyType.js';

interface SupplyTypeDocument extends ISupplyType, Document {
  _id: string;
}

export const SupplyTypeSchema = new Schema<SupplyTypeDocument>(
  {
    _id: { type: String, default: uuidv4 },
    ID: Number,
    Title: String,
  },
  { _id: false }
);

const SupplyType = mongoose.model<SupplyTypeDocument>('SupplyType', SupplyTypeSchema);

export default SupplyType;
