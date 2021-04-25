import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  preset: 'ts-jest',
  // testEnvironment: 'node',
  // testEnvironment: 'jest-environment-node',
  transform: {},
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
  moduleNameMapper: {
    '\\.(css|less|sass)$': '<rootDir>/src/styleMock.ts',
  },
  // moduleDirectories: ['node_modules', '<rootDir>/node_modules', '.'],
};
export default config;
