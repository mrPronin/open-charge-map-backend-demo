import { ContainerModule } from 'inversify';

// Network API interface
import { API } from '@dal/api.js';

// Interfaces & Types
import { TYPES } from '@domain/types';
import { ImportService } from '@domain/interfaces/services/ImportService.js';
import { ImportSessionRepository } from '@domain/interfaces/repositories/ImportSessionRepository.js';
import { OCMPersistenceRepository } from '@domain/interfaces/repositories/OCMPersistenceRepository.js';
import { OpenChargeMapRepository } from '@domain/interfaces/repositories/OpenChargeMapRepository.js';

// Services
import { ImportServiceImplementation } from '@domain/services/ImportService.js';

// Repositories
import { ImportSessionRepositoryImplementation } from '@dal/repositories/ImportSessionRepository.js';
import { OCMPersistenceRepositoryImplementation } from '@dal/repositories/OCMPersistenceRepository.js';
import { OpenChargeMapRepositoryImplementation } from '@dal/repositories/OpenChargeMapRepository.js';

export const referenceIoCData = new ContainerModule((bind) => {
  bind<ImportService>(TYPES.ImportService).to(ImportServiceImplementation);
  bind<ImportSessionRepository>(TYPES.ImportSessionRepository).to(
    ImportSessionRepositoryImplementation
  );
  bind<OCMPersistenceRepository>(TYPES.OCMPersistenceRepository).to(
    OCMPersistenceRepositoryImplementation
  );
  bind<OpenChargeMapRepository>(TYPES.OpenChargeMapRepository).to(
    OpenChargeMapRepositoryImplementation
  );
});
