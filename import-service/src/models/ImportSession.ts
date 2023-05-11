import mongoose, { Document, Schema } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

interface IImportSession extends Document {
  _id: string;
  poiAmount: number;
  modifiedsince: Date;
  startDate: Date;
  endDate: Date;
}

const ImportSessionSchema: Schema = new Schema({
  _id: { type: String, default: uuidv4 },
  poiAmount: { type: Number, required: true },
  modifiedsince: { type: Date, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
});

const ImportSession = mongoose.model<IImportSession>(
  'ImportSession',
  ImportSessionSchema
);

export default ImportSession;
