import mongoose, { Document, Schema } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

export interface ICountry extends Document {
  _id: string;
  ID: number;
  ISOCode: string;
  ContinentCode: string;
  Title: string;
}

export const CountrySchema = new Schema<ICountry>(
  {
    _id: { type: String, default: uuidv4 },
    ID: Number,
    ISOCode: String,
    ContinentCode: String,
    Title: String,
  },
  { _id: false }
);

const Country = mongoose.model<ICountry>('Country', CountrySchema);

export default Country;
