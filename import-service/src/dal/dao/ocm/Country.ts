import mongoose, { Document, Schema } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import { Country as ICountry } from '@domain/models/ocm/Country.js';

interface CountryDocument extends ICountry, Document {
  _id: string;
}

export const CountrySchema = new Schema<CountryDocument>(
  {
    _id: { type: String, default: uuidv4 },
    ID: { type: Number, required: true, index: true },
    ISOCode: { type: String, required: true, default: '' },
    ContinentCode: { type: String, required: false, default: '' },
    Title: { type: String, required: false, default: '' },
  },
  { _id: false }
);

export const CountryModel = mongoose.model<CountryDocument>('Country', CountrySchema);