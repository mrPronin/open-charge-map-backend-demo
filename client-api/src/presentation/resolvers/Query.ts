import { parsePaginationArgs } from 'prisma-cursor-pagination';
import { TYPES } from '@domain/types.js';
import { OCMService } from '@domain/interfaces/services/OCMService.js';
import { GraphQLContext } from '@presentation/GraphQLContext.js';

export const resolver = {
  Query: {
    pois: async (_, args, context: GraphQLContext) => {
      const { toConnection } = parsePaginationArgs(args);
      const ocmService = context.container.get<OCMService>(TYPES.OCMService);

      const poi = await ocmService.pois(args);
      return toConnection(poi);
    },
  },
};
