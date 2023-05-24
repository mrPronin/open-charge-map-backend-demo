// eslint-disable-next-line import/order, import/no-extraneous-dependencies
import { PaginationArgs } from 'prisma-cursor-pagination';
import { POI } from '@domain/models/POI.js';

import { OCMRepository } from '@domain/interfaces/repositories/OCMRepository.js';

@injectable()
export class OCMRepositoryImplementation implements OCMRepository {
  pois = async (args: PaginationArgs): Promise<POI[]> => {
    return [];
  };
}
