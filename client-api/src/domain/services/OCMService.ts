import { injectable, inject } from 'inversify';
// eslint-disable-next-line import/order, import/no-extraneous-dependencies
import { PaginationArgs } from 'prisma-cursor-pagination';

import { POI } from '@domain/models/POI.js';
import { OCMService } from '@/domain/interfaces/services/OCMService.js';

@injectable()
export class OCMServiceImplementation implements OCMService {
  pois = async (args: PaginationArgs): Promise<POI[]> => {
    return [];
  };
}
