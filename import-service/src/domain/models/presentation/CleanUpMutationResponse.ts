import { MutationResponse } from '@domain/models/presentation/index.js';

export interface CleanUpMutationResponse extends MutationResponse {
  success: boolean;
  message: string;
}
