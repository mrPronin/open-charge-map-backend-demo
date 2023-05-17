import { injectable, inject } from 'inversify';
import { TYPES } from "@domain/types.js";
import { ImportSession } from '@domain/models/import/ImportSession.js';
import { ImportMutationResponse } from '@domain/models/import/ImportMutationResponse.js';
import { ImportService } from '@domain/interfaces/services/ImportService.js';
import { OpenChargeMapRepository } from '@domain/interfaces/repositories/OpenChargeMapRepository.js';
import { OCMPersistenceRepository } from '@domain/interfaces/repositories/OCMPersistenceRepository.js';
import { ImportSessionRepository } from '@domain/interfaces/repositories/ImportSessionRepository.js';

// debug
import { mockedImportMutationResponse } from "@presentation/mocked/mockedImportMutationResponse.js";
import { mockedImportSessions } from "@presentation/mocked/mockedImportSessions.js";
// debug

@injectable()
export class ImportServiceImplementation implements ImportService {
  constructor(
    @inject(TYPES.OpenChargeMapRepository)
    private readonly openChargeMapRepository: OpenChargeMapRepository,
    @inject(TYPES.OCMPersistenceRepository)
    private readonly ocmPersistenceRepository: OCMPersistenceRepository,
    @inject(TYPES.ImportSessionRepository)
    private readonly importSessionRepository: ImportSessionRepository
  ) {}

  import = async (): Promise<ImportMutationResponse> => {
    // debug
     return mockedImportMutationResponse;
    // debug
    const isFirstSession = await this.importSessionRepository.isEmpty();
    let modifiedSince: Date = null;
    if (!isFirstSession) {
      const lastPOI = await this.ocmPersistenceRepository.getLastPOIUpdate();
      // TODO: extract 10 minutes
      modifiedSince = lastPOI.DateLastStatusUpdate;
    }
    const poi = await this.openChargeMapRepository.getPOI(modifiedSince);
    const startDate = new Date();
    if (!poi.length) {
      return {
        success: true,
        importSession: null,
        message: 'There are no new objects to import.',
      };
    }
    const coreReferenceData =
      await this.openChargeMapRepository.getReferenceData();
    await this.ocmPersistenceRepository.storeCoreReferenceData(
      coreReferenceData
    );
    await this.ocmPersistenceRepository.storePOIs(poi);
    const endDate = new Date();
    const importSession: ImportSession = {
      poiAmount: poi.length,
      modifiedsince: modifiedSince,
      startDate,
      endDate,
    };
    await this.importSessionRepository.create(importSession);
    return {
      success: true,
      importSession,
      message: 'Date imported successfully',
    };
  };

  importSessions = async (): Promise<ImportSession[]> => {
    // debug
    return mockedImportSessions;
    // debug
    return await this.importSessionRepository.getAll();
  };
}
