import mongoose, { Document, Schema } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

import { IOperatorInfo, OperatorInfoSchema } from "./OperatorInfo.js";
import { IStatusType, StatusTypeSchema } from "./StatusType.js";
import { IAddressInfo, AddressInfoSchema } from "./AddressInfo.js";
import { IConnectionInfo, ConnectionInfoSchema } from "./ConnectionInfo.js";

interface IPOI extends Document {
  _id: string;
  ID: number;
  UUID: string;
  OperatorInfo: IOperatorInfo;
  StatusType: IStatusType;
  AddressInfo: IAddressInfo;
  Connections: IConnectionInfo[];
}

const POISchema = new Schema<IPOI>(
  {
    _id: { type: String, default: uuidv4 },
    ID: { type: Number, required: true },
    UUID: { type: String, required: true },
    OperatorInfo: { type: OperatorInfoSchema, required: true },
    StatusType: { type: StatusTypeSchema, required: true },
    AddressInfo: { type: AddressInfoSchema, required: true },
    Connections: { type: [ConnectionInfoSchema], required: true },
  },
  { _id: false }
);

const POI = mongoose.model<IPOI>('POI', POISchema);

export default POI;
