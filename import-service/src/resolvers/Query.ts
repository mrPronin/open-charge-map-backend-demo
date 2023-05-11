import { mockedImportSessions } from './mockedImportSessions.js';

export const resolver = {
  Query: {
    importSessions: () => mockedImportSessions,
  },
};