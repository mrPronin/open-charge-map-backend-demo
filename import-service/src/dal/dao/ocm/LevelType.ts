import mongoose, { Document, Schema } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import { LevelType as ILevelType } from '@domain/models/ocm/LevelType.js';

interface LevelTypeDocument extends ILevelType, Document {
  _id: string;
}

export const LevelTypeSchema = new Schema<LevelTypeDocument>(
  {
    _id: { type: String, default: uuidv4 },
    ID: {
      type: Number,
      required: true,
      index: true
    },
    Title: String,
    Comments: String,
    IsFastChargeCapable: Boolean,
  },
  { _id: false }
);

export const LevelTypeModel = mongoose.model<LevelTypeDocument>('LevelType', LevelTypeSchema);