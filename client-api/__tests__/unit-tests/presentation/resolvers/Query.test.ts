import {
  jest,
  describe,
  afterEach,
  beforeEach,
  expect,
  it,
} from '@jest/globals';
import { Container } from 'inversify';
import * as prismaCursorPagination from 'prisma-cursor-pagination';
import { PaginationArgs } from 'prisma-cursor-pagination';
import { TYPES } from '@domain/types.js';
import { POI } from '@domain/models/POI.js';
import { OCMService } from '@domain/interfaces/services/OCMService.js';
import { resolver } from '@presentation/resolvers/Query.js';

// Mocked dependencies
jest.mock('prisma-cursor-pagination');

describe('Resolver', () => {
  let container: Container;
  let mockOCMService: jest.Mocked<OCMService>;

  beforeEach(() => {
    container = new Container();
    mockOCMService = {
      pois: jest.fn(),
    };

    container
      .bind<OCMService>(TYPES.OCMService)
      .toConstantValue(mockOCMService);

    (prismaCursorPagination.parsePaginationArgs as jest.Mock).mockReturnValue({
      toConnection: jest.fn().mockReturnValue([]),
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('calls the OCMService with correct args', async () => {
    const args: PaginationArgs = { first: 10 };

    await resolver.Query.pois(null, args, { container });
    expect(mockOCMService.pois).toHaveBeenCalledWith(args);
  });

  it('calls toConnection and returns the result', async () => {
    const args: PaginationArgs = { first: 10 };
    const mockData: POI[] = [
      {
        id: 'foo',
        ID: 1,
        UUID: '1234',
        Connections: [],
      },
    ];
    const mockResult = { edges: [] };

    mockOCMService.pois.mockResolvedValue(mockData);

    (prismaCursorPagination.parsePaginationArgs as jest.Mock).mockReturnValue({
      toConnection: jest.fn().mockReturnValue(mockResult),
    });

    const result = await resolver.Query.pois(null, args, { container });

    expect(prismaCursorPagination.parsePaginationArgs).toHaveBeenCalledWith(
      args
    );
    expect(result).toBe(mockResult);
  });
});
