import { DateTimeResolver } from 'graphql-scalars';

const mockedImportSessions = [
  {
    id: '57BC7CE8-E2C7-46D3-B009-ECFE508DCDF2',
    poiAmount: 5,
    modifiedsince: '2023-05-04T00:00:00Z',
    startDate: '2023-05-07T10:00:00Z',
    endDate: '2023-05-07T10:01:00Z',
  },
  {
    id: '2FC98C26-0DD1-4D15-8538-DFB31F10C63E',
    poiAmount: 10,
    modifiedsince: '2023-05-05T00:00:00Z',
    startDate: '2023-05-08T10:00:00Z',
    endDate: '2023-05-08T10:01:00Z',
  },
  {
    id: 'ABABE00E-17E0-4ABA-9BF6-2F52E0726C94',
    poiAmount: 8,
    modifiedsince: '2023-05-06T00:00:00Z',
    startDate: '2023-05-09T10:00:00Z',
    endDate: '2023-05-09T10:01:00Z',
  },
];

const mockedImportMutationResponse = {
  code: '200',
  success: true,
  message: 'Data has been successfully imported',
  importSession: mockedImportSessions[0],
};

export const resolvers = {
  DateTime: DateTimeResolver,
  Mutation: {
    import: () => mockedImportMutationResponse,
  },
  Query: {
    importSessions: () => mockedImportSessions,
  },
};