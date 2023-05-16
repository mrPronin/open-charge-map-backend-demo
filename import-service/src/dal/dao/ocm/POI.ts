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
    OperatorInfo: { type: OperatorInfoSchema, required: true },
    StatusType: { type: StatusTypeSchema, required: true },
    AddressInfo: { type: AddressInfoSchema, required: true },
    Connections: { type: [ConnectionInfoSchema], required: true },
    DateLastStatusUpdate: { type: Date },
  },
  { _id: false }
);

const POI = mongoose.model<POIDocument>('POI', POISchema);

export default POI;
