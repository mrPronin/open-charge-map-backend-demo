import { ImportSession, ImportSessionCreateInput } from '@domain/models/import/ImportSession.js'

export interface ImportSessionRepository {
  create(importSession: ImportSessionCreateInput): Promise<ImportSession>;
  getAll(): Promise<ImportSession[]>;
  isEmpty(): Promise<Boolean>;
}
