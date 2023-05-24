// import { TYPES } from '@domain/types';
// TODO: import service
// import { ImportService } from '@domain/interfaces/services/ImportService.js';
import { parsePaginationArgs } from 'prisma-cursor-pagination';
// import { GraphQLContext } from '@presentation/GraphQLContext.js';
// debug
// eslint-disable-next-line import/order, import/no-extraneous-dependencies
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
// debug

export const resolver = {
  Query: {
    pois: async (_, args /* , context: GraphQLContext */) => {
      const { findManyArgs, toConnection } = parsePaginationArgs(args);
      const poi = await prisma.pOI.findMany(findManyArgs);
      console.log(poi);
      return toConnection(poi);
      //   const importService = context.container.get<ImportService>(
      //     TYPES.ImportService
      //   );
      //   return await importService.importSessions();
    },
  },
};
