import { TYPES } from '@domain/types';
import { ImportService } from '@domain/interfaces/services/ImportService.js';
import { GraphQLContext } from '@presentation/GraphQLContext.js';

export const resolver = {
  Mutation: {
    import: async (_, __, context: GraphQLContext) => {
      const importService = context.container.get<ImportService>(
        TYPES.ImportService
      );
      return await importService.import();
    },
    cleanUp: async (_, __, context: GraphQLContext) => {
      const importService = context.container.get<ImportService>(
        TYPES.ImportService
      );
      return await importService.cleanUp();
    },
  },
};
