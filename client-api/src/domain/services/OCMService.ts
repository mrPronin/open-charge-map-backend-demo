import { injectable, inject } from 'inversify';
import { PaginationArgs } from 'prisma-cursor-pagination';

import { TYPES } from '@domain/types.js';
import { OCMRepository } from '@domain/interfaces/repositories/OCMRepository.js';
import { POI } from '@domain/models/POI.js';
import { OCMService } from '@/domain/interfaces/services/OCMService.js';

@injectable()
export class OCMServiceImplementation implements OCMService {
  constructor(
    @inject(TYPES.OCMRepository)
    private readonly ocmRepository: OCMRepository
  ) {}

  pois = async (args: PaginationArgs): Promise<POI[]> => {
    return this.ocmRepository.pois(args);
  };
}
