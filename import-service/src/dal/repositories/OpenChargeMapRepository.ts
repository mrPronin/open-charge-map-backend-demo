import axios from 'axios';
import { POI } from '@domain/models/ocm/POI.js';
import { CoreReferenceData } from '@domain/models/ocm/CoreReferenceData.js';
import { OpenChargeMapRepository } from '@domain/interfaces/repositories/OpenChargeMapRepository.js';

export class OpenChargeMapRepositoryImplementation implements OpenChargeMapRepository {
  private baseUrl = 'https://api.openchargemap.io/v3/';
  private apiKey = process.env.OCM_API_KEY;

  getReferenceData = async (): Promise<CoreReferenceData> => {
    const response = await axios.get(`${this.baseUrl}referencedata`);
    return response.data;
  };

  getPOI = async (modifiedSince?: Date): Promise<POI[]> => {
    let url = `${this.baseUrl}poi?key=${this.apiKey}&output=json&client=open-charge-map-backend&camelcase=false&verbose=false&compact=true`;

    if (modifiedSince) {
      const isoDateString = modifiedSince.toISOString();
      url += `&modifiedsince=${isoDateString}`;
    } else {
      url += `&maxresults=200000`;
    }

    const response = await axios.get(url);
    return response.data;
  };
}