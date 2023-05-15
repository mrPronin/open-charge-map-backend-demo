import mongoose, { Document, Schema } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

import { ICountry, CountrySchema } from "./Country.js";

export interface IAddressInfo extends Document {
  _id: string;
  ID: number;
  AddressLine1: string;
  AddressLine2: string;
  Town: string;
  StateOrProvince: string;
  Postcode: string;
  CountryID: number;
  Country: ICountry;
  Latitude: number;
  Longitude: number;
  ContactTelephone1: string;
  ContactTelephone2: string;
  ContactEmail: string;
  AccessComments: string;
  RelatedURL: string;
  Distance: number;
  DistanceUnit: number;
  Title: string;
}

export const AddressInfoSchema = new Schema<IAddressInfo>(
  {
    _id: { type: String, default: uuidv4 },
    ID: Number,
    AddressLine1: String,
    AddressLine2: String,
    Town: String,
    StateOrProvince: String,
    Postcode: String,
    CountryID: Number,
    Country: CountrySchema,
    Latitude: Number,
    Longitude: Number,
    ContactTelephone1: String,
    ContactTelephone2: String,
    ContactEmail: String,
    AccessComments: String,
    RelatedURL: String,
    Distance: Number,
    DistanceUnit: Number,
    Title: String,
  },
  { _id: false }
);

const AddressInfo = mongoose.model<IAddressInfo>(
  'AddressInfo',
  AddressInfoSchema
);

export default AddressInfo;
