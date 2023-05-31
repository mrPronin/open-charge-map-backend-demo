import { describe, beforeEach, expect, it, jest } from '@jest/globals';
import { PrismaPromise } from 'prisma';
import { PaginationArgs, parsePaginationArgs } from 'prisma-cursor-pagination';
import { POI } from '@domain/models/POI.js';
import { prismaMock } from '../../../helpers/singleton.utils';

import { OCMRepositoryImplementation } from '../../../../src/dal/repositories/OCMRepository';

const mockPOI = require('../../../mock/poi.json');

const poi: POI[] = mockPOI.map((item) => {
  return {
    ...item,
    id: item.UUID,
    DateLastStatusUpdate: new Date(item.DateLastStatusUpdate),
  };
});

describe('OCMRepositoryImplementation', () => {
  let ocmRepository: OCMRepositoryImplementation;
  let args: PaginationArgs;

  beforeEach(() => {
    ocmRepository = new OCMRepositoryImplementation(prismaMock);
  });

  it('should call prisma with correct args', async () => {
    jest
      .spyOn(prismaMock.pOI, 'findMany')
      .mockImplementation(() => Promise.resolve(poi) as any);

    args = {
      first: 1,
    };

    const result = await ocmRepository.pois(args);

    // Check the returned result
    expect(result).toEqual(poi);
  });
});
