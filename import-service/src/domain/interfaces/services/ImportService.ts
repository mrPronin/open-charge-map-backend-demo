import { ImportSession } from '@domain/models/import/ImportSession.js';
import { ImportMutationResponse } from '@domain/models/import/ImportMutationResponse.js';

export interface ImportService {
  import: () => Promise<ImportMutationResponse>;
  importSessions: () => Promise<ImportSession[]>;
}
