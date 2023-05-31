import tsconfig from './tsconfig.json' assert { type: 'json' };

function makeModuleNameMapper(srcPath) {
    // Get paths from tsconfig
    const { paths } = tsconfig.compilerOptions;

    const aliases = {};

    // Iterate over paths and convert them into moduleNameMapper format
    Object.keys(paths).forEach((item) => {
        const key = item.replace('/*', '/(.*)');
        const path = paths[item][0].replace('/*', '/$1');
        aliases[key] = srcPath + '/' + path;
    });

    // Replace .js with .ts in the resulting map
    Object.keys(aliases).forEach(key => {
        aliases[key] = aliases[key].replace('.js', '.ts');
    });

    return aliases;
}

const SRC_PATH = '<rootDir>';

export default {
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: "coverage",
  coverageProvider: "v8",
  moduleNameMapper: {
    '^@domain/(.*)\\.js$': '<rootDir>/src/domain/$1.ts',
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
