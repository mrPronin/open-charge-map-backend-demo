import { Container } from "inversify";

// Interfaces & Types
import { TYPES } from '@domain/types';
import { ImportService } from '@domain/interfaces/services/ImportService.js';
import { ImportSessionRepository } from '@domain/interfaces/repositories/ImportSessionRepository.js';
import { OCMPersistenceRepository } from '@domain/interfaces/repositories/OCMPersistenceRepository.js';
import { OpenChargeMapRepository } from '@domain/interfaces/repositories/OpenChargeMapRepository.js';

// Services
import { ImportServiceImplementation } from "@domain/services/ImportService.js";

// Repositories
import { ImportSessionRepositoryImplementation } from "@dal/repositories/ImportSessionRepository.js";
import { OCMPersistenceRepositoryImplementation } from "@dal/repositories/OCMPersistenceRepository.js";
import { OpenChargeMapRepositoryImplementation } from "@dal/repositories/OpenChargeMapRepository.js";

const container = new Container();

container
  .bind<ImportService>(TYPES.ImportService)
  .to(ImportServiceImplementation);
container
  .bind<ImportSessionRepository>(TYPES.ImportSessionRepository)
  .to(ImportSessionRepositoryImplementation);
container
  .bind<OCMPersistenceRepository>(TYPES.OCMPersistenceRepository)
  .to(OCMPersistenceRepositoryImplementation);
container
  .bind<OpenChargeMapRepository>(TYPES.OpenChargeMapRepository)
  .to(OpenChargeMapRepositoryImplementation);

  export default container;