import { mockedImportMutationResponse } from './mockedImportMutationResponse.js';

export const resolver = {
  Mutation: {
    import: () => mockedImportMutationResponse,
  },
};