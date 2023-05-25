import { Type, Expose } from 'class-transformer';
import {
  POI,
  ConnectionInfo,
  OperatorInfo,
  StatusType,
  AddressInfo,
} from '@domain/models/ocm/index.js';
import {
  OperatorInfoDTO,
  StatusTypeDTO,
  AddressInfoDTO,
} from '@dal/api/dto/index.js';

export class POIDTO implements POI {
  @Expose() ID: number;

  @Expose() UUID: string;

  @Expose() OperatorID: number;

  @Expose() @Type(() => OperatorInfoDTO) OperatorInfo?: OperatorInfo;

  @Expose() StatusTypeID: number;

  @Expose() @Type(() => StatusTypeDTO) StatusType?: StatusType;

  @Expose() @Type(() => AddressInfoDTO) AddressInfo: AddressInfo;

  @Expose() Connections: ConnectionInfo[];

  @Type(() => Date) @Expose() DateLastStatusUpdate?: Date;
}
