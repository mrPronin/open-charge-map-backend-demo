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
import { v4 as uuidv4 } from 'uuid';
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
        const startDate = new Date();

    const isFirstSession = await this.importSessionRepository.isEmpty();
    let modifiedSince: Date = null;
    if (!isFirstSession) {
      // TODO: extract 10 minutes
      modifiedSince = await this.ocmPersistenceRepository.getLastPOIUpdate();
      console.log('modifiedSince: ', modifiedSince);
    }
    // fetch POI data from OCM
    const poi = await this.openChargeMapRepository.getPOI(modifiedSince);
    if (!poi.length) {
      return {
        success: true,
        importSession: null,
        message: 'There are no new objects to import.',
      };
    }
    const referenceData =
      await this.openChargeMapRepository.getReferenceData();
    await this.ocmPersistenceRepository.storeReferenceData(referenceData);
    await this.ocmPersistenceRepository.storePOIs(poi, isFirstSession);
    const endDate = new Date();
    const importSession: ImportSession = {
      id: uuidv4(),
      poiAmount: poi.length,
      modifiedsince: modifiedSince || new Date(),
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
    return await this.importSessionRepository.getAll();
  };
}
