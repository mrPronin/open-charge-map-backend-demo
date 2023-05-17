import { injectable, inject } from 'inversify';
import { ImportSession } from '@domain/models/import/ImportSession.js';
import { ImportSessionRepository } from '@domain/interfaces/repositories/ImportSessionRepository.js';
import { ImportSessionModel } from '@dal/dao/import/ImportSession.js';
// debug
import { mockedImportSessions } from "@presentation/mocked/mockedImportSessions.js";
// debug

@injectable()
export class ImportSessionRepositoryImplementation
  implements ImportSessionRepository
{
  isEmpty = async (): Promise<Boolean> => {
    return (await ImportSessionModel.count()) === 0;
  };
  create = async (importSession: ImportSession): Promise<void> => {
    // const importSessionDocument = new ImportSessionModel(importSession);
    // await importSessionDocument.save();
  };

  getAll = async (): Promise<ImportSession[]> => {
    // debug
    return mockedImportSessions;
    // debug
    ImportSessionModel.count();
    const importSessionDocuments = await ImportSessionModel.find();
    return importSessionDocuments.map((doc) => doc.toObject());
  };
}
