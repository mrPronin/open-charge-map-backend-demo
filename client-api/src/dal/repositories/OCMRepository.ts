import { injectable, inject } from 'inversify';
import { PaginationArgs, parsePaginationArgs } from 'prisma-cursor-pagination';
import { POI } from '@domain/models/POI.js';
import { TYPES } from '@domain/types.js';
import { PrismaClient } from '@prisma/client';

import { OCMRepository } from '@domain/interfaces/repositories/OCMRepository.js';

@injectable()
export class OCMRepositoryImplementation implements OCMRepository {
  constructor(
    @inject(TYPES.PrismaClient)
    private readonly prisma: PrismaClient
  ) {}

  pois = async (args: PaginationArgs): Promise<POI[]> => {
    const { findManyArgs } = parsePaginationArgs(args);
    console.log('findManyArgs:', findManyArgs);
    return this.prisma.pOI.findMany(findManyArgs);
  };
}
