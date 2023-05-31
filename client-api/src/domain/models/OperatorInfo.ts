import { AddressInfo } from './AddressInfo.js';

export interface OperatorInfo {
  ID: number;
  WebsiteURL?: string | null;
  Comments?: string | null;
  PhonePrimaryContact?: string | null;
  PhoneSecondaryContact?: string | null;
  AddressInfo?: AddressInfo | null;
  BookingURL?: string | null;
  ContactEmail?: string | null;
  FaultReportEmail?: string | null;
  IsRestrictedEdit?: boolean | null;
  Title?: string | null;
}
