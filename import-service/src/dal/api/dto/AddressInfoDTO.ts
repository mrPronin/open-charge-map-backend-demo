import { Type, Expose } from 'class-transformer';
import { AddressInfo, Country } from '@domain/models/ocm/index.js';
import { CountryDTO } from '@dal/api/dto/index.js';

export class AddressInfoDTO implements AddressInfo {
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
