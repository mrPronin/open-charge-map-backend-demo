import { describe, beforeEach, expect, it, jest } from '@jest/globals';
import { PaginationArgs } from 'prisma-cursor-pagination';
import { OCMServiceImplementation } from '@domain/services/OCMService.js';
import { OCMRepository } from '@domain/interfaces/repositories/OCMRepository.js';
import { GraphQLError } from 'graphql';
import { POI } from '@domain/models/POI.js';

import mockPOI from '@test/mock/poi.json';

const poi: POI[] = mockPOI.map((item) => {
  return {
    ...item,
    id: item.UUID,
    DateLastStatusUpdate: new Date(item.DateLastStatusUpdate),
  };
});

const mockedPois = jest.fn(async (args: PaginationArgs): Promise<POI[]> => {
  return Promise.resolve(poi);
});

const repositoryMock: OCMRepository = {
  pois: mockedPois,
};

describe('OCMServiceImplementation', () => {
  let service: OCMServiceImplementation;

  beforeEach(() => {
    service = new OCMServiceImplementation(repositoryMock);
  });

  it('throws a GraphQLError when both [first] and [last] are provided', async () => {
    const args: PaginationArgs = { first: 1, last: 1 };
    await expect(service.pois(args)).rejects.toThrow(GraphQLError);
  });

  it('throws a GraphQLError when [first] is negative', async () => {
    const args: PaginationArgs = { first: -1 };
    await expect(service.pois(args)).rejects.toThrow(GraphQLError);
  });

  it('throws a GraphQLError when [last] is negative', async () => {
    const args: PaginationArgs = { last: -1 };
    await expect(service.pois(args)).rejects.toThrow(GraphQLError);
  });

  it('calls the repository with the correct arguments', async () => {
    const args: PaginationArgs = { first: 1 };
    mockedPois.mockResolvedValue([]);
    await service.pois(args);
    expect(repositoryMock.pois).toHaveBeenCalledWith(args);
  });

  it('returns the result from the repository', async () => {
    const args: PaginationArgs = { first: 1 };
    mockedPois.mockResolvedValue(poi);
    const result = await service.pois(args);
    expect(result).toBe(poi);
  });
});
