import { ContainerModule } from 'inversify';

// Interfaces & Types
import { TYPES } from '@domain/types.js';
import { OCMService } from '@domain/interfaces/services/OCMService.js';
import { OCMRepository } from '@domain/interfaces/repositories/OCMRepository.js';

// Services
import { OCMServiceImplementation } from '@domain/services/OCMService.js';

// Repositories
import { OCMRepositoryImplementation } from '@dal/repositories/OCMRepository.js';

export const referenceIoCData = new ContainerModule((bind) => {
  bind<OCMService>(TYPES.OCMService).to(OCMServiceImplementation);
  bind<OCMRepository>(TYPES.OCMRepository).to(OCMRepositoryImplementation);
});
