import { Type, Expose } from 'class-transformer';
import { OperatorInfo, AddressInfo } from '@domain/models/ocm/index.js';
import { AddressInfoDTO } from '@dal/api/dto/index.js';

export class OperatorInfoDTO implements OperatorInfo {
  @Expose() WebsiteURL?: string;

  @Expose() Comments?: string;

  @Expose() PhonePrimaryContact?: string;

  @Expose() PhoneSecondaryContact?: string;

  @Expose() @Type(() => AddressInfoDTO) AddressInfo?: AddressInfo;

  @Expose() BookingURL?: string;

  @Expose() ContactEmail?: string;

  @Expose() FaultReportEmail?: string;

  @Expose() IsRestrictedEdit?: boolean;

  @Expose() ID: number;

  @Expose() Title?: string;
}
