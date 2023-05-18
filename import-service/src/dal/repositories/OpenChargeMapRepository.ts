import { injectable, inject } from 'inversify';
import axios from 'axios';
import { POI } from '@domain/models/ocm/POI.js';
import { CoreReferenceData } from '@domain/models/ocm/CoreReferenceData.js';
import { OpenChargeMapRepository } from '@domain/interfaces/repositories/OpenChargeMapRepository.js';

// debug
import * as referenceData from '@presentation/mocked/openchargemap-referencedata.json';
// import * as mockPOIData from '@presentation/mocked/openchargemap-poi-compact.json';
import mockPOIData from '@presentation/mocked/openchargemap-poi-compact.json';
// debug

@injectable()
export class OpenChargeMapRepositoryImplementation
  implements OpenChargeMapRepository
{
  private baseUrl = 'https://api.openchargemap.io/v3/';
  private apiKey = process.env.OCM_API_KEY;

  getReferenceData = async (): Promise<CoreReferenceData> => {
    return referenceData;
    const response = await axios.get(`${this.baseUrl}referencedata`);
    return response.data;
  };

  getPOI = async (modifiedSince?: Date): Promise<POI[]> => {
    return mockPOIData.map(convertToPOI);
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

const convertToPOI = (input: any): POI => {
  let operatorInfo = referenceData.Operators.find(
    (operator) => operator.ID === input.OperatorID
  );
  let statusType = referenceData.StatusTypes.find(
    (status) => status.ID === input.StatusTypeID
  );

  return {
    ID: input.ID,
    UUID: input.UUID,
    OperatorID: input.OperatorID,
    OperatorInfo: operatorInfo,
    StatusTypeID: input.StatusTypeID,
    StatusType: statusType,
    AddressInfo: input.AddressInfo,
    Connections: input.Connections,
    DateLastStatusUpdate: input.DateLastStatusUpdate
      ? new Date(input.DateLastStatusUpdate)
      : undefined,
  };
};