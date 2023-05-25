import { injectable, inject } from 'inversify';
import { TYPES } from '@domain/types.js';
import { CONSTANTS } from '@domain/constants.js';
import { POI } from '@domain/models/ocm/POI.js';
import { CoreReferenceData } from '@domain/models/ocm/CoreReferenceData.js';
import { OCMRepository } from '@domain/interfaces/repositories/OCMRepository.js';

import { API } from '@dal/api/api';
import { POIDTO } from '@dal/api/dto/index.js';

@injectable()
export class OCMRepositoryImplementation implements OCMRepository {
  private readonly defaultParams: Record<string, string>;

  constructor(@inject(TYPES.API) private readonly api: API) {
    this.defaultParams = {
      output: 'json',
      camelcase: 'false',
      verbose: 'false',
      compact: 'true',
    };
  }

  getReferenceData = async (): Promise<CoreReferenceData> => {
    return this.api.get<CoreReferenceData>('/referencedata/');
  };

  getPOI = async (modifiedSince?: Date): Promise<POI[]> => {
    const poi = await this.api.get<POIDTO[]>('/poi/', {
      ...this.defaultParams,
      ...(modifiedSince && { modifiedSince }),
    });
    return poi;
  };

  getPOIAndStoreToFile = async (path: string): Promise<void> => {
    const dynamicParams = {
      maxresults: CONSTANTS.POI_INITIAL_IMPORT_MAX_RESULTS,
    };
    const params = { ...this.defaultParams, ...dynamicParams };
    await this.api.fetchAndStoreToFile(
      '/poi/',
      CONSTANTS.POI_FILE_NAME,
      CONSTANTS.POI_INITIAL_IMPORT_TIMEOUT,
      params
    );
  };
}
