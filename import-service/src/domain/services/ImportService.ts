import { ImportSession } from '@domain/models/import/ImportSession.js';
import { ImportMutationResponse } from '@domain/models/import/ImportMutationResponse.js';
import { ImportService } from '@domain/interfaces/services/ImportService.js';
import { OpenChargeMapRepository } from '@domain/interfaces/repositories/OpenChargeMapRepository.js';
import { OCMPersistenceRepository } from '@domain/interfaces/repositories/OCMPersistenceRepository.js';
import { ImportSessionRepository } from '@domain/interfaces/repositories/ImportSessionRepository.js';

class ImportServiceImplementation implements ImportService {
  private openChargeMapRepository: OpenChargeMapRepository;
  private ocmPersistenceRepository: OCMPersistenceRepository;
  private importSessionRepository: ImportSessionRepository;

  constructor(
    openChargeMapRepository: OpenChargeMapRepository,
    ocmPersistenceRepository: OCMPersistenceRepository,
    importSessionRepository: ImportSessionRepository
  ) {
    this.openChargeMapRepository = openChargeMapRepository;
    this.ocmPersistenceRepository = ocmPersistenceRepository;
    this.importSessionRepository = importSessionRepository;
  }

  import = async (): Promise<ImportMutationResponse> => {
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
    const coreReferenceData = await this.openChargeMapRepository.getReferenceData();
    await this.ocmPersistenceRepository.storeCoreReferenceData(coreReferenceData);
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
    return await this.importSessionRepository.getAll();
  };
}

export default ImportServiceImplementation;
