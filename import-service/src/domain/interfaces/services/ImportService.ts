import {
  ImportSession,
  ImportMutationResponse,
  CleanUpMutationResponse,
} from '@domain/models/presentation/index.js';

export interface ImportService {
  import: () => Promise<ImportMutationResponse>;
  importSessions: () => Promise<ImportSession[]>;
  cleanUp: () => Promise<CleanUpMutationResponse>;
}
