import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { DateTimeTypeDefinition, DateTimeResolver } from 'graphql-scalars';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { resolver as QueryResolver } from "./resolvers/Query.js";
import { resolver as MutationResolver } from "./resolvers/Mutation.js";
import * as db from './db.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const typeDefs = fs.readFileSync(
  path.join(__dirname, 'schema.graphql'),
  'utf8'
);

const port = (process.env.PORT && Number.parseInt(process.env.PORT, 10)) || 4000;

async function main() {
    // await db.connect();
    const server = new ApolloServer({
      schema: makeExecutableSchema({
        typeDefs: [DateTimeTypeDefinition, typeDefs],
        resolvers: {
          DateTime: DateTimeResolver,
          ...QueryResolver,
          ...MutationResolver,
        },
      }),
    });
    const { url } = await startStandaloneServer(server, { listen: { port } });
    console.log(`🚀  Server ready at: ${url}`);
}

main().catch((error) => console.error('failed starting server', error));