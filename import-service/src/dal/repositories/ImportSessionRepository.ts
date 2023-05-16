import { ImportSession } from '@domain/models/import/ImportSession.js';
import { ImportSessionRepository } from '@domain/interfaces/repositories/ImportSessionRepository.js';
import { ImportSessionModel } from '@dal/dao/import/ImportSession.js';

export class ImportSessionRepositoryImplementation implements ImportSessionRepository {
  create = async (importSession: ImportSession): Promise<void> => {
    const importSessionDocument = new ImportSessionModel(importSession);
    await importSessionDocument.save();
  };

  getAll = async (): Promise<ImportSession[]> => {
    const importSessionDocuments = await ImportSessionModel.find();
    return importSessionDocuments.map((doc) => doc.toObject());
  };
}