import { mockedImportSessions } from './mockedImportSessions.js';

export const mockedImportMutationResponse = {
  code: '200',
  success: true,
  message: 'Data has been successfully imported',
  importSession: mockedImportSessions[0],
};
