import { ImportSession } from '../../models/import/ImportSession.js';

export interface ImportSessionRepository {
  create(importSession: ImportSession): Promise<void>;
  getAll(): Promise<ImportSession[]>;
}
