import { Expose } from 'class-transformer';

import { Country } from '@domain/models/ocm/index.js';

export class CountryDTO implements Country {
  @Expose() ID: number;

  @Expose() ISOCode: string;

  @Expose() ContinentCode?: string;

  @Expose() Title?: string;
}
