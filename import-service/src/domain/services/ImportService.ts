import { ImportSession } from '@domain/models/import/ImportSession.js';
import { ImportMutationResponse } from '@domain/models/import/ImportMutationResponse.js';
import { ImportService } from '@domain/interfaces/services/ImportService.js';
import { OpenChargeMapRepository } from '@domain/interfaces/repositories/OpenChargeMapRepository.js';
import { OCMPersistenceRepository } from '@domain/interfaces/repositories/OCMPersistenceRepository.js';

class ImportServiceImplementation implements ImportService {
  private openChargeMapRepository: OpenChargeMapRepository;
  private ocmPersistenceRepository: OCMPersistenceRepository;

  constructor(
    openChargeMapRepository: OpenChargeMapRepository,
    ocmPersistenceRepository: OCMPersistenceRepository
  ) {
    this.openChargeMapRepository = openChargeMapRepository;
    this.ocmPersistenceRepository = ocmPersistenceRepository;
  }

  import = async (): Promise<ImportMutationResponse> => {
    // Implementation here.
    // Fetch data from OpenChargeMapRepository, handle first-time or subsequent imports.
    // Store data using OCMPersistenceRepository.
    return {
  success: true,
  importSession: null,
  message: "mocked message"
}
  };

  importSessions = async (): Promise<ImportSession[]> => {
    // Implementation here.
    // Retrieve the list of import sessions from OCMPersistenceRepository.
    return []
  };
}

export default ImportServiceImplementation;
