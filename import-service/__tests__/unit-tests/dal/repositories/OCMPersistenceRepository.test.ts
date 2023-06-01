import mockingoose from 'mockingoose';
import { describe, beforeEach, expect, it, jest } from '@jest/globals';
import { OCMPersistenceRepositoryImplementation } from '@dal/repositories/OCMPersistenceRepository.js';

import { ConnectionTypeModel } from '@dal/dao/ocm/index.js';

describe('Test ConnectionTypeModel', () => {
  beforeEach(() => {});
  it('should call deleteMany', async () => {
    const expectedResult = {
      acknowledged: true,
      deletedCount: 3,
    };
    mockingoose(ConnectionTypeModel).toReturn(expectedResult, 'deleteMany');
    const result = await ConnectionTypeModel.deleteMany();
    expect(result).toMatchObject(expectedResult);
  });
});
