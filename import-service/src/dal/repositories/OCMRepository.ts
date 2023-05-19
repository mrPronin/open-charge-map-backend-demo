import { injectable, inject } from 'inversify';
import { plainToInstance } from 'class-transformer';
import { TYPES } from '@domain/types.js';
import { POI } from '@domain/models/ocm/POI.js';
import { CoreReferenceData } from '@domain/models/ocm/CoreReferenceData.js';
import { OCMRepository } from '@domain/interfaces/repositories/OCMRepository.js';

import { API } from '@dal/api/api';
import { POIDTO } from "@dal/api/dto.js";

// debug
import mockPOIData from '@presentation/mocked/openchargemap-poi-compact.json';
// debug

@injectable()
export class OCMRepositoryImplementation
  implements OCMRepository
{
  constructor(@inject(TYPES.API) private readonly api: API) {}

  getReferenceData = async (): Promise<CoreReferenceData> => {
    return await this.api.get<CoreReferenceData>('/referencedata/');
  };

  getPOI = async (modifiedSince?: Date): Promise<POI[]> => {
    const poi = plainToInstance(POIDTO, mockPOIData, {
      excludeExtraneousValues: true,
    });
    // console.dir(poi, { depth: null });
    return poi;
    // return mockPOIData;

    // return mockPOIData.map(convertToPOI);

    // let url = `${this.baseUrl}poi?key=${this.apiKey}&output=json&client=open-charge-map-backend&camelcase=false&verbose=false&compact=true`;

    // if (modifiedSince) {
    //   const isoDateString = modifiedSince.toISOString();
    //   url += `&modifiedsince=${isoDateString}`;
    // } else {
    //   url += `&maxresults=200000`;
    // }

    // const response = await axios.get(url);
    // return response.data;
  };
}