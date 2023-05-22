import { TYPES } from '@domain/types';
// TODO: import service
// import { ImportService } from '@domain/interfaces/services/ImportService.js';
import { GraphQLContext } from '@presentation/GraphQLContext.js';

export const resolver = {
  Query: {
    pois: async (_, __, context: GraphQLContext) => {
      //   const importService = context.container.get<ImportService>(
      //     TYPES.ImportService
      //   );
      //   return await importService.importSessions();
    },
  },
};
