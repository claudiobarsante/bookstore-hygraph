module.exports = {
  //preset: 'ts-jest',
  testEnvironment: 'jsdom',
  // transform: {
  //   '^.+\\.ts?$': 'ts-jest'
  // },
  // transformIgnorePatterns: ['<rootDir>/node_modules/'],
  testPathIgnorePatterns: ['/node_modules/', '/.next/'],
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.ts(x)?'
    //   '!src/**/stories.tsx',
    //   '!src/pages/**/*.tsx',
    //   '!src/styles/**/*.ts',
    //   '!src/utils/apollo.ts',
    //   '!src/types/**/*.d.ts',
    //   '!src/utils/apolloCache.ts',
    //   '!src/types/**/*.d.ts',
    //   '!src/graphql/**/*.ts',
    //   '!src/**/mock.ts'
  ],
  setupFilesAfterEnv: ['<rootDir>/setupTests.ts'],
  moduleDirectories: ['node_modules', 'src'],
  modulePaths: ['<rootDir>/src/', '<rootDir>/.jest']
};
