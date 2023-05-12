import mongoose, { Document, Schema } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

export interface ILevelType extends Document {
  _id: string;
  ID: number;
  Title: string;
  Comments: string;
  IsFastChargeCapable: boolean;
}

export const LevelTypeSchema = new Schema<ILevelType>(
  {
    _id: { type: String, default: uuidv4 },
    ID: Number,
    Title: String,
    Comments: String,
    IsFastChargeCapable: Boolean,
  },
  { _id: false }
);

const LevelType = mongoose.model<ILevelType>('LevelType', LevelTypeSchema);

export default LevelType;
