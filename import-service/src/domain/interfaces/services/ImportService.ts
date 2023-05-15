import { ImportSession } from '../../models/import/ImportSession.js';
import { ImportMutationResponse } from '../../models/import/ImportMutationResponse.js';

export interface ImportService {
  import: () => Promise<ImportMutationResponse>;
  importSessions: () => Promise<ImportSession[]>;
}
