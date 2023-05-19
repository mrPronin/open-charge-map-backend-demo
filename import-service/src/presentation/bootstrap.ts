import { Container, ContainerModule } from 'inversify';
import * as fs from 'node:fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { ApolloServer } from '@apollo/server';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { startStandaloneServer } from '@apollo/server/standalone';
import { DateTimeTypeDefinition, DateTimeResolver } from 'graphql-scalars';

import * as db from '@dal/db.js';
import { GraphQLContext } from '@presentation/GraphQLContext.js';
import { resolver as QueryResolver } from '@presentation/resolvers/Query.js';
import { resolver as MutationResolver } from '@presentation/resolvers/Mutation.js';
import { TYPES } from "@domain/types.js";
import { CONSTANTS } from "@domain/constants.js";
import { API, APIImplementation } from "@dal/api/api.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function bootstrap(
  container: Container,
  appPort: number,
  dbURI: string,
  dbName: string,
  baseAPIUrl: string,
  apiKey: string,
  ...modules: ContainerModule[]
) {
  container
    .bind<API>(TYPES.API)
    .toConstantValue(new APIImplementation(baseAPIUrl, apiKey))
  container.load(...modules);

  await db.connect(dbURI, dbName);

  // debug
  /*
  setTimeout(async () => {
    const api = container.get<API>(TYPES.API)
    console.log('Fetch large data: start')
    await api.getLargeData(
      '/poi?key=ff82541f-c8d1-4507-be67-bd07e3259c4e&output=json&client=open-charge-map-backend&camelcase=false&verbose=false&maxresults=200000&compact=true',
      CONSTANTS.poiFileName,
      30 * 60 * 1000
    );
    console.log('Fetch large data: finish');
  }, 2000);
  */
  // debug
  const typeDefs = fs.readFileSync(
    path.join(__dirname, 'schema.graphql'),
    'utf8'
  );

  const server = new ApolloServer<GraphQLContext>({
    schema: makeExecutableSchema({
      typeDefs: [DateTimeTypeDefinition, typeDefs],
      resolvers: {
        DateTime: DateTimeResolver,
        ...QueryResolver,
        ...MutationResolver,
      },
    }),
  });
  const { url } = await startStandaloneServer(server, {
    listen: { port: appPort },
    context: async () => ({
      container,
    }),
  });
  console.log(`🚀  Server ready at: ${url}`);
}
