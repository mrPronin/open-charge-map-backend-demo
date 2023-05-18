import { Country } from "./Country.js";

export interface AddressInfo {
  ID: number;
  AddressLine1?: string;
  AddressLine2?: string;
  Town?: string;
  StateOrProvince?: string;
  Postcode?: string;
  CountryID: number;
  Country?: Country;
  Latitude: number;
  Longitude: number;
  ContactTelephone1?: string;
  ContactTelephone2?: string;
  ContactEmail?: string;
  AccessComments?: string;
  RelatedURL?: string;
  Distance?: number;
  DistanceUnit?: number;
  Title?: string;
}
