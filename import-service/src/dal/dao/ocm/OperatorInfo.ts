import mongoose, { Document, Schema } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

import { AddressInfoSchema } from "./AddressInfo.js";
import { OperatorInfo as IOperatorInfo } from '@domain/models/ocm/OperatorInfo.js';

interface OperatorInfoDocument extends IOperatorInfo, Document {
  _id: string;
}

export const OperatorInfoSchema = new Schema<OperatorInfoDocument>(
  {
    _id: { type: String, default: uuidv4 },
    WebsiteURL: { type: String },
    Comments: { type: String },
    PhonePrimaryContact: { type: String },
    PhoneSecondaryContact: { type: String },
    AddressInfo: { type: AddressInfoSchema },
    BookingURL: { type: String },
    ContactEmail: { type: String, default: '' },
    FaultReportEmail: { type: String },
    IsRestrictedEdit: { type: Boolean },
    ID: { type: Number, required: true },
    Title: { type: String, required: false },
  },
  { _id: false }
);

export const OperatorInfoModel = mongoose.model<OperatorInfoDocument>(
  'OperatorInfo',
  OperatorInfoSchema
);