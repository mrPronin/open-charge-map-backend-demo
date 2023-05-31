import { Country } from './Country.js';

export interface AddressInfo {
  ID: number;
  AddressLine1?: string | null;
  AddressLine2?: string | null;
  Town?: string | null;
  StateOrProvince?: string | null;
  Postcode?: string | null;
  Country?: Country | null;
  Latitude: number;
  Longitude: number;
  ContactTelephone1?: string | null;
  ContactTelephone2?: string | null;
  ContactEmail?: string | null;
  AccessComments?: string | null;
  RelatedURL?: string | null;
  Distance?: number | null;
  DistanceUnit?: number | null;
  Title?: string | null;
}
