import { PaginationArgs } from 'prisma-cursor-pagination';
import { POI } from '@domain/models/POI.js';

export interface OCMRepository {
  pois: (args: PaginationArgs) => Promise<POI[]>;
}
