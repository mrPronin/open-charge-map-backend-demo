// eslint-disable-next-line import/order, import/no-extraneous-dependencies
import { PaginationArgs } from 'prisma-cursor-pagination';
import { POI } from '@domain/models/POI.js';

export interface OCMService {
  pois: (args: PaginationArgs) => Promise<POI[]>;
}
