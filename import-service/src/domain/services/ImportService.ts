import { injectable, inject } from 'inversify';
import { TYPES } from '@domain/types.js';
import { CONSTANTS } from '@domain/constants.js';
import { ImportSession } from '@domain/models/import/ImportSession.js';
import { ImportMutationResponse } from '@domain/models/import/ImportMutationResponse.js';
import { ImportService } from '@domain/interfaces/services/ImportService.js';
import { OCMRepository } from '@domain/interfaces/repositories/OCMRepository.js';
import { OCMPersistenceRepository } from '@domain/interfaces/repositories/OCMPersistenceRepository.js';
import { ImportSessionRepository } from '@domain/interfaces/repositories/ImportSessionRepository.js';

@injectable()
export class ImportServiceImplementation implements ImportService {
  constructor(
    @inject(TYPES.OCMRepository)
    private readonly ocmRepository: OCMRepository,
    @inject(TYPES.OCMPersistenceRepository)
    private readonly ocmPersistenceRepository: OCMPersistenceRepository,
    @inject(TYPES.ImportSessionRepository)
    private readonly importSessionRepository: ImportSessionRepository
  ) {}

  import = async (): Promise<ImportMutationResponse> => {
    const startDate = new Date();

    const isFirstSession = await this.importSessionRepository.isEmpty();
    let modifiedSince: Date = null;
    if (!isFirstSession) {
      modifiedSince = await this.ocmPersistenceRepository.getLastPOIUpdate();
      // subsctract time offset to ensure capturing the latest changes
      modifiedSince = subtractFromDate(
        modifiedSince,
        CONSTANTS.timeOffsetForPOIImport
      );
    }

    // fetch POI data from OCM
    const poi = await this.ocmRepository.getPOI(modifiedSince);
    if (!poi.length) {
      return {
        success: true,
        importSession: null,
        message: 'There are no new objects to import.',
      };
    }
    const referenceData = await this.ocmRepository.getReferenceData();
    const importSession = await this.importSessionRepository.persistOCM(
      referenceData,
      poi,
      isFirstSession,
      // TODO: get modifiedSince as most recent DateLastStatusUpdate from poi
      modifiedSince || new Date(),
      startDate
    );
    return {
      success: true,
      importSession,
      message: 'Date imported successfully',
    };
  };

  importSessions = async (): Promise<ImportSession[]> => {
    return await this.importSessionRepository.getAll();
  };
}

const subtractFromDate = (date: Date, minutes: number): Date => {
  return new Date(date.getTime() - minutes * 60 * 1000);
};
