import mongoose from 'mongoose';
import { injectable } from 'inversify';
import { ImportSession } from '@domain/models/import/ImportSession.js';
import { ImportSessionRepository } from '@domain/interfaces/repositories/ImportSessionRepository.js';
import { ImportSessionModel } from '@dal/dao/import/ImportSession.js';

@injectable()
export class ImportSessionRepositoryImplementation
  implements ImportSessionRepository
{
  isEmpty = async (): Promise<Boolean> => {
    return (await ImportSessionModel.count()) === 0;
  };
  create = async (importSession: ImportSession): Promise<ImportSession> => {
    const document = new ImportSessionModel(importSession);
    await document.save();
    return toModel<ImportSession>(document);
  };

  getAll = async (): Promise<ImportSession[]> => {
    const importSessionDocuments = await ImportSessionModel.find();
    return importSessionDocuments.map((doc) => toModel<ImportSession>(doc));
  };
}

function toModel<T>(doc: mongoose.Document): T {
  const object = doc.toObject() as T & {
    _id: string;
    ID: string;
  };
  object.ID = doc.id;
  delete object['_id'];
  return object as T;
}
