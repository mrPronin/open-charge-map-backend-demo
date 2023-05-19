import { injectable, inject } from 'inversify';
import { TYPES } from '@domain/types.js';
import { POI } from '@domain/models/ocm/POI.js';
import { CoreReferenceData } from '@domain/models/ocm/CoreReferenceData.js';
import { OCMRepository } from '@domain/interfaces/repositories/OCMRepository.js';

import { API } from '@dal/api/api';
import { POIDTO } from "@dal/api/dto.js";

@injectable()
export class OCMRepositoryImplementation
  implements OCMRepository
{
  constructor(@inject(TYPES.API) private readonly api: API) {}

  getReferenceData = async (): Promise<CoreReferenceData> => {
    return await this.api.get<CoreReferenceData>('/referencedata/');
  };

  getPOI = async (modifiedSince?: Date): Promise<POI[]> => {
    const defaultParams = {
      output: 'json',
      camelcase: 'false',
      verbose: 'false',
      compact: 'true',
    };

    const dynamicParams = modifiedSince
      ? { modifiedSince }
      : { maxresults: 200000 };

    const params = { ...defaultParams, ...dynamicParams };
    const poi = await this.api.get<POIDTO[]>('/poi/', params);
    return poi;
  };
}