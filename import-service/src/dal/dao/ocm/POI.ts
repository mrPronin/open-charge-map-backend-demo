import mongoose, { Document, Schema } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

import { OperatorInfoSchema } from "./OperatorInfo.js";
import { StatusTypeSchema } from "./StatusType.js";
import { AddressInfoSchema } from "./AddressInfo.js";
import { ConnectionInfoSchema } from "./ConnectionInfo.js";
import { POI as IPOI } from '@domain/models/ocm/POI.js';

interface POIDocument extends IPOI, Document {
  _id: string;
}

const POISchema = new Schema<POIDocument>(
  {
    _id: { type: String, default: uuidv4 },
    ID: { type: Number, required: true },
    UUID: { type: String, required: true },
    OperatorID: { type: Number, required: true, default: 0 },
    OperatorInfo: { type: OperatorInfoSchema, required: false },
    StatusTypeID: { type: Number, required: true, default: 0 },
    StatusType: { type: StatusTypeSchema, required: false },
    AddressInfo: { type: AddressInfoSchema, required: false },
    Connections: { type: [ConnectionInfoSchema], required: true, default: [] },
    DateLastStatusUpdate: { type: Date, required: true },
  },
  { _id: false }
);

POISchema.index({ DateLastStatusUpdate: 1 });

export const POIModel = mongoose.model<POIDocument>('POI', POISchema);