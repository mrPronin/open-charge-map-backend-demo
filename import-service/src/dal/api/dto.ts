import { Type, Expose } from 'class-transformer';
import { POI } from '@domain/models/ocm/POI.js';
import { CoreReferenceData } from '@domain/models/ocm/CoreReferenceData.js';
import { OperatorInfo } from '@domain/models/ocm/OperatorInfo.js';
import { StatusType } from '@domain/models/ocm/StatusType.js';
import { AddressInfo } from '@domain/models/ocm/AddressInfo.js';
import { ConnectionInfo } from '@domain/models/ocm/ConnectionInfo.js';
import { ConnectionType } from '@domain/models/ocm/ConnectionType.js';
import { Country } from '@domain/models/ocm/Country.js';
import { SupplyType } from '@domain/models/ocm/SupplyType.js';

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

class OperatorInfoDTO implements OperatorInfo {
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

class AddressInfoDTO implements AddressInfo {
  @Expose() ID: number;
  @Expose() AddressLine1?: string;
  @Expose() AddressLine2?: string;
  @Expose() Town?: string;
  @Expose() StateOrProvince?: string;
  @Expose() Postcode?: string;
  @Expose() CountryID: number;
  @Expose() @Type(() => CountryDTO) Country?: Country;
  @Expose() Latitude: number;
  @Expose() Longitude: number;
  @Expose() ContactTelephone1?: string;
  @Expose() ContactTelephone2?: string;
  @Expose() ContactEmail?: string;
  @Expose() AccessComments?: string;
  @Expose() RelatedURL?: string;
  @Expose() Distance?: number;
  @Expose() DistanceUnit?: number;
  @Expose() Title?: string;
}

export class CountryDTO implements Country {
  @Expose() ID: number;
  @Expose() ISOCode: string;
  @Expose() ContinentCode?: string;
  @Expose() Title?: string;
}

export class StatusTypeDTO implements StatusType {
  @Expose() IsOperational?: boolean;
  @Expose() IsUserSelectable?: boolean;
  @Expose() ID: number;
  @Expose() Title?: string;
}

// export class CoreReferenceDataDTO implements CoreReferenceData {
//   @Expose() @Type(() => ConnectionTypeDTO) ConnectionTypes: ConnectionType[];
//   @Expose() @Type(() => CountryDTO) Countries: Country[];
//   @Expose() @Type(() => OperatorInfoDTO) Operators: OperatorInfo[];
//   @Expose() @Type(() => StatusTypeDTO) StatusTypes: StatusType[];
//   @Expose() @Type(() => SupplyTypeDTO) CurrentTypes: SupplyType[];
// }

// export class ConnectionTypeDTO implements ConnectionType {
//   @Expose() FormalName?: string;
//   @Expose() IsDiscontinued?: boolean;
//   @Expose() IsObsolete?: boolean;
//   @Expose() ID: number;
//   @Expose() Title?: string;
// }

// export class SupplyTypeDTO implements SupplyType {
//   @Expose() ID: number;
//   @Expose() Title?: string;
// }
