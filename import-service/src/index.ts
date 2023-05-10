import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { DateTimeTypeDefinition } from "graphql-scalars";
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { resolvers } from "./resolvers";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const typeDefs = fs.readFileSync(
  path.join(__dirname, 'schema.graphql'),
  'utf8'
);

const port = (process.env.PORT && Number.parseInt(process.env.PORT, 10)) || 4000;

const server = new ApolloServer({
  schema: makeExecutableSchema({
    typeDefs: [DateTimeTypeDefinition, typeDefs],
    resolvers: resolvers,
  }),
});

const { url } = await startStandaloneServer(server, {
  listen: { port },
});

console.log(`🚀  Server ready at: ${url}`);
