import mongoose, { Document, Schema } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

import { CountrySchema } from "./Country.js";
import { AddressInfo as IAddressInfo } from '../../../domain/models/AddressInfo.js';

interface AddressInfoDocument extends IAddressInfo, Document {
  _id: string;
}

export const AddressInfoSchema = new Schema<AddressInfoDocument>(
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

const AddressInfo = mongoose.model<AddressInfoDocument>(
  'AddressInfo',
  AddressInfoSchema
);

export default AddressInfo;
