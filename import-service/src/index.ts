import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { DateTimeResolver, DateTimeTypeDefinition } from "graphql-scalars";

const typeDefs = `#graphql
    "Generic response interface for any mutation"
    interface MutationResponse {
        code: String!
        success: Boolean!
        message: String!
    }

    "Response type for import mutation"
    type ImportMutationResponse implements MutationResponse {
        code: String!
        success: Boolean!
        message: String!
        importSession: ImportSession
    }

    "Describes the result of the data import operation from the Open Charge Map service"
    type ImportSession {
        id: ID!
        poiAmount: Int!
        modifiedsince: DateTime!
        startDate: DateTime!
        endDate: DateTime!
    }

    type Mutation {
        "Starts the procedure of importing data from the Open Charge Map service. If this is the first import session, all data will be imported. If there are previous import sessions, the data from the modifiedsince date of the previous session will be imported."
        import: ImportMutationResponse!
    }
  type Query {
    importSessions: [ImportSession]
  }
`;

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
