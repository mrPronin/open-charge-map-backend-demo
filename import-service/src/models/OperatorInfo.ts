import mongoose, { Document, Schema } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

import { IAddressInfo, AddressInfoSchema } from "./AddressInfo.js";

export interface IOperatorInfo extends Document {
  _id: string;
  WebsiteURL?: string;
  Comments?: string;
  PhonePrimaryContact?: string;
  PhoneSecondaryContact?: string;
  IsPrivateIndividual?: boolean;
  AddressInfo?: IAddressInfo;
  BookingURL?: string;
  ContactEmail?: string;
  FaultReportEmail?: string;
  IsRestrictedEdit?: boolean;
  ID: number;
  Title: string;
}

export const OperatorInfoSchema = new Schema<IOperatorInfo>(
  {
    _id: { type: String, default: uuidv4 },
    WebsiteURL: { type: String },
    Comments: { type: String },
    PhonePrimaryContact: { type: String },
    PhoneSecondaryContact: { type: String },
    IsPrivateIndividual: { type: Boolean, default: false },
    AddressInfo: { type: AddressInfoSchema },
    BookingURL: { type: String },
    ContactEmail: { type: String },
    FaultReportEmail: { type: String },
    IsRestrictedEdit: { type: Boolean },
    ID: { type: Number, required: true },
    Title: { type: String, required: true },
  },
  { _id: false }
);

const OperatorInfo = mongoose.model<IOperatorInfo>(
  'OperatorInfo',
  OperatorInfoSchema
);

export default OperatorInfo;
