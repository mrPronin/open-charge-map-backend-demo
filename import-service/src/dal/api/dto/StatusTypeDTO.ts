import { Expose } from 'class-transformer';

import { StatusType } from '@domain/models/ocm/index.js';

export class StatusTypeDTO implements StatusType {
  @Expose() IsOperational?: boolean;

  @Expose() IsUserSelectable?: boolean;

  @Expose() ID: number;

  @Expose() Title?: string;
}
