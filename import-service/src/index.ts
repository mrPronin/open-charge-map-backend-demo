import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { DateTimeResolver, DateTimeTypeDefinition } from "graphql-scalars";
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const typeDefs = fs.readFileSync(
  path.join(__dirname, 'schema.graphql'),
  'utf8'
);

const mockedImportSessions = [
  {
    id: "57BC7CE8-E2C7-46D3-B009-ECFE508DCDF2",
    poiAmount: 5,
    modifiedsince: "2023-05-04T00:00:00Z",
    startDate: "2023-05-07T10:00:00Z",
    endDate: "2023-05-07T10:01:00Z",
  },
  {
    id: "2FC98C26-0DD1-4D15-8538-DFB31F10C63E",
    poiAmount: 10,
    modifiedsince: "2023-05-05T00:00:00Z",
    startDate: "2023-05-08T10:00:00Z",
    endDate: "2023-05-08T10:01:00Z",
  },
  {
    id: "ABABE00E-17E0-4ABA-9BF6-2F52E0726C94",
    poiAmount: 8,
    modifiedsince: "2023-05-06T00:00:00Z",
    startDate: "2023-05-09T10:00:00Z",
    endDate: "2023-05-09T10:01:00Z",
  },
];

const mockedImportMutationResponse = {
  code: "200",
  success: true,
  message: "Data has been successfully imported",
  importSession: mockedImportSessions[0],
};

const resolvers = {
  DateTime: DateTimeResolver,
  Mutation: {
    import: () => mockedImportMutationResponse,
  },
  Query: {
    importSessions: () => mockedImportSessions,
  },
};

const server = new ApolloServer({
  schema: makeExecutableSchema({
    typeDefs: [DateTimeTypeDefinition, typeDefs],
    resolvers: resolvers,
  }),
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log(`🚀  Server ready at: ${url}`);
