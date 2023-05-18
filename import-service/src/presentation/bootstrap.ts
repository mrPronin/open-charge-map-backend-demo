import * as fs from 'node:fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { ApolloServer } from '@apollo/server';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { startStandaloneServer } from '@apollo/server/standalone';
import { DateTimeTypeDefinition, DateTimeResolver } from 'graphql-scalars';
import 'reflect-metadata';

import * as db from '@dal/db.js';
import { container } from "@/inversify.config.js";
import { GraphQLContext } from '@presentation/GraphQLContext.js';
import { resolver as QueryResolver } from '@presentation/resolvers/Query.js';
import { resolver as MutationResolver } from '@presentation/resolvers/Mutation.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function bootstrap(
  appPort: number,
  dbURI: string,
  dbName: string
) {
  await db.connect(dbURI, dbName);

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
