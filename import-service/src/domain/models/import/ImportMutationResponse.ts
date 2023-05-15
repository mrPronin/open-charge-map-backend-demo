import { ImportSession } from './ImportSession.js';

export interface ImportMutationResponse {
  success: boolean;
  importSession: ImportSession | null;
  message: string;
}
