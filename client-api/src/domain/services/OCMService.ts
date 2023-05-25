import { injectable, inject } from 'inversify';
import { PaginationArgs } from 'prisma-cursor-pagination';
import { GraphQLError } from 'graphql';

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
    if (args.first || args.first) {
      throw new GraphQLError(
        'Including a value for both the [first] and the [last] parameter is not supported',
        {
          extensions: {
            code: 'BAD_USER_INPUT',
          },
        }
      );
    }

    if (args.first < 0) {
      throw new GraphQLError('[first] parameter must be positive integer', {
        extensions: {
          code: 'BAD_USER_INPUT',
        },
      });
    }

    if (args.last < 0) {
      throw new GraphQLError('[last] parameter must be positive integer', {
        extensions: {
          code: 'BAD_USER_INPUT',
        },
      });
    }

    return this.ocmRepository.pois(args);
  };
}
