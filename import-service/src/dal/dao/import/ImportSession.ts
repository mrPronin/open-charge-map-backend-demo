import mongoose, { Document, Schema } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

import { ImportSession as IImportSession } from '@domain/models/presentation/ImportSession.js';

interface ImportSessionDocument extends IImportSession, Document {
  _id: string;
}

const ImportSessionSchema: Schema = new Schema<ImportSessionDocument>({
  _id: { type: String, default: uuidv4 },
  poiAmount: { type: Number, required: true },
  modifiedsince: { type: Date, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
});

export const ImportSessionModel = mongoose.model<ImportSessionDocument>(
  'ImportSession',
  ImportSessionSchema
);