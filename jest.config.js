// gkc_hash_code : 01GTV23767S9DZK4X5XW12WCT8
const nextJest = require('next/jest');

const createJestConfig = nextJest({
  dir: './',
});

const customJestConfig = {
  moduleDirectories: ['node_modules', '<rootDir>/'],
  testEnvironment: 'jest-environment-jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest-setup.js'],
  moduleNameMapper: {
    '@/(.*)$': '<rootDir>/src/$1',
  },
  collectCoverage: true,
  collectCoverageFrom: [
    './src/stores/features/**/*.ts',
    './src/utils/*.ts',
    '!./src/utils/zod.ts',
    '!./src/stores/features/list/*.ts',
  ],
  coverageThreshold: {
    global: {
      statements: 80,
      branches: 80,
      functions: 80,
      lines: 80,
    },
  },
};

module.exports = createJestConfig(customJestConfig);
