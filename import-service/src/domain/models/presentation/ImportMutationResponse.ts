import {
  ImportSession,
  MutationResponse,
} from '@domain/models/presentation/index.js';

export interface ImportMutationResponse extends MutationResponse {
  success: boolean;
  importSession: ImportSession | null;
  message: string;
}
