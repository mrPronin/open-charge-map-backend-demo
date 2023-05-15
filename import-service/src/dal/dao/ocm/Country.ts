import mongoose, { Document, Schema } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import { Country as ICountry } from "../../../domain/models/Country.js";

interface CountryDocument extends ICountry, Document {
  _id: string;
}

export const CountrySchema = new Schema<CountryDocument>(
  {
    _id: { type: String, default: uuidv4 },
    ID: Number,
    ISOCode: String,
    ContinentCode: String,
    Title: String,
  },
  { _id: false }
);

const Country = mongoose.model<CountryDocument>('Country', CountrySchema);

export default Country;
