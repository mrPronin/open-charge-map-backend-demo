import mongoose, { Document, Schema } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

import { AddressInfo as IAddressInfo } from '@domain/models/index.js';
import { CountrySchema } from './Country.js';

interface AddressInfoDocument extends IAddressInfo, Document {
  _id: string;
}

export const AddressInfoSchema = new Schema<AddressInfoDocument>(
  {
    _id: { type: String, default: uuidv4 },
    ID: { type: Number, required: true, default: 0 },
    AddressLine1: { type: String, required: false, default: '' },
    AddressLine2: { type: String, required: false, default: null },
    Town: { type: String, required: false },
    StateOrProvince: { type: String, required: false },
    Postcode: { type: String, required: false },
    CountryID: { type: Number, required: true },
    Country: { type: CountrySchema, required: false },
    Latitude: { type: Number, required: true, default: 0 },
    Longitude: { type: Number, required: true, default: 0 },
    ContactTelephone1: { type: String, required: false, default: null },
    ContactTelephone2: { type: String, required: false, default: null },
    ContactEmail: { type: String, required: false },
    AccessComments: { type: String, required: false },
    RelatedURL: { type: String, required: false, default: null },
    Distance: { type: Number, required: false, default: null },
    DistanceUnit: { type: Number, required: false, default: 1 },
    Title: { type: String, required: false },
  },
  { _id: false }
);

export const AddressInfoModel = mongoose.model<AddressInfoDocument>(
  'AddressInfo',
  AddressInfoSchema
);
