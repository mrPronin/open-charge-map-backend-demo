import {
  describe,
  beforeEach,
  expect,
  it,
  jest,
  afterEach,
} from '@jest/globals';
import { PaginationArgs, FindManyArgs } from 'prisma-cursor-pagination';
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
  let prismaArgs: FindManyArgs;
  // let findManyMock = jest.fn<typeof prismaMock.pOI.findMany>();
  let findManyMock: jest.Spied<typeof prismaMock.pOI.findMany>;

  beforeEach(() => {
    ocmRepository = new OCMRepositoryImplementation(prismaMock);
    findManyMock = jest.spyOn(prismaMock.pOI, 'findMany');
  });

  afterEach(() => {
    findManyMock.mockClear();
  });

  it('responds with list of POI and called with correct args', async () => {
    findManyMock.mockImplementation(() => Promise.resolve(poi) as any);

    const first: number = 1;
    args = {
      first,
    };

    prismaArgs = {
      take: first + 1,
    };

    const result = await ocmRepository.pois(args);

    // Check the returned result
    expect(result).toEqual(poi);
    // Check if the findMany function was called with correct args
    expect(findManyMock).toHaveBeenCalledWith(prismaArgs);
  });

  it('should throw an error when prisma findMany fails', async () => {
    findManyMock.mockImplementation(
      () => Promise.reject(new Error('Database error')) as any
    );

    args = {
      first: 1,
    };

    await expect(ocmRepository.pois(args)).rejects.toThrow('Database error');
  });

  it('should return an empty array when there are no results', async () => {
    findManyMock.mockImplementation(() => Promise.resolve([]) as any);

    args = {
      first: 1,
    };

    const result = await ocmRepository.pois(args);

    // Check the returned result
    expect(result).toEqual([]);
  });
});
