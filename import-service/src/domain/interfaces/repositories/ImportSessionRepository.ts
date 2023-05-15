import { ImportSession } from '../../models/import/ImportSession.js';

export interface ImportSessionRepository {
  create(importSession: ImportSession): Promise<ImportSession>;
  getAll(): Promise<ImportSession[]>;
}
