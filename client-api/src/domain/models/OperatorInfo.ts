import { AddressInfo } from './AddressInfo.js';

export interface OperatorInfo {
  ID: number;
  WebsiteURL?: string;
  Comments?: string;
  PhonePrimaryContact?: string;
  PhoneSecondaryContact?: string;
  AddressInfo?: AddressInfo;
  BookingURL?: string;
  ContactEmail?: string;
  FaultReportEmail?: string;
  IsRestrictedEdit?: boolean;
  Title?: string;
}
