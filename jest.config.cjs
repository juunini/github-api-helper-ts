module.exports = {
  testEnvironment: 'node',
  collectCoverageFrom: [
    '**/*.{ts,tsx}',
    '!**/*.d.ts',
    '!**/*.js',
    '!**/node_modules/**'
  ],
  testMatch: [
    '**/tests/**/?(*.)+(spec|test).ts?(x)'
  ],
  setupFilesAfterEnv: [
    'jest-plugin-context/setup'
  ],
  testPathIgnorePatterns: [
    '<rootDir>/node_modules/'
  ],
  transformIgnorePatterns: [
    '/node_modules/',
    '/__snapshots__/'
  ],
  transform: {
    '^.+\\.(t|j)s?$': ['@swc/jest']
  },
  coveragePathIgnorePatterns: [
    '/node_modules/',
    '.js',
    '/__snapshots__/'
  ],
  moduleNameMapper: {
    '@/(.*)$': '<rootDir>/src/$1'
  }
}
