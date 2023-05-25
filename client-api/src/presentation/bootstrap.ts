import { Container, ContainerModule } from 'inversify';
import * as fs from 'node:fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { ApolloServer } from '@apollo/server';
import { PrismaClient } from '@prisma/client';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { startStandaloneServer } from '@apollo/server/standalone';
import { DateTimeTypeDefinition, DateTimeResolver } from 'graphql-scalars';

import { GraphQLContext } from '@presentation/GraphQLContext.js';
import { resolver as QueryResolver } from '@presentation/resolvers/Query.js';
import { TYPES } from '@domain/types.js';

// eslint-disable-next-line no-underscore-dangle
const __filename = fileURLToPath(import.meta.url);
// eslint-disable-next-line no-underscore-dangle
const __dirname = path.dirname(__filename);

export async function bootstrap(
  container: Container,
  appPort: number,
  ...modules: ContainerModule[]
) {
  const prisma = new PrismaClient();
  container
    .bind<PrismaClient>(TYPES.PrismaClient)
    .toConstantValue(prisma);
  container.load(...modules);

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
      },
    }),
  });
  const { url } = await startStandaloneServer(server, {
    listen: { port: appPort },
    context: async () => ({
      container,
    }),
  });
  async function closeGracefully(signal) {
    console.log(`Received signal to terminate: ${signal}`)

    await prisma.$disconnect();
    process.kill(process.pid, signal);
  }
  process.once('SIGINT', closeGracefully)
  process.once('SIGTERM', closeGracefully)

  console.log(`🚀  Server ready at: ${url}`);
}
