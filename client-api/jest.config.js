
const SRC_PATH = '<rootDir>';

export default {
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: "coverage",
  coverageProvider: "v8",
  moduleNameMapper: {
    '^@domain/(.*)\\.js$': '<rootDir>/src/domain/$1.ts',
    '^@dal/(.*)\\.js$': '<rootDir>/src/dal/$1.ts',
    '^@test/(.*)\\.js$': '<rootDir>/__tests__/$1.ts',
    '^@test/(.*)\\.json$': '<rootDir>/__tests__/$1.json'
  },
  preset: 'ts-jest',
  roots: [
    SRC_PATH
  ],
  setupFilesAfterEnv: [
    '<rootDir>/__tests__/helpers/singleton.utils.ts',
    '<rootDir>/jest.setup.ts'],
  testEnvironment: 'node',
  testPathIgnorePatterns: [
    "/node_modules/",
    "/__tests__/helpers/"
  ],
  'transform': {
        '^.+\\.tsx?$': 'ts-jest'
    },
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.test.json',
      useESM: true
    }
  },
};
