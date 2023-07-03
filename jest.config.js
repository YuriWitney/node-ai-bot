module.exports = {
  collectCoverageFrom: [
    '<rootDir>/src/**/*.ts',
    '!<rootDir>/src/**/*.spec.ts',
    '!<rootDir>/src/index.ts',
    '!<rootDir>/src/bots/*.ts'
  ],
  coverageDirectory: 'coverage',
  moduleNameMapper: {
    '@/(.+)': '<rootDir>/src/$1'
  },
  testMatch: ['**/*.spec.ts'],
  roots: [
    '<rootDir>/src'
  ],
  transform: {
    '\\.ts$': 'ts-jest'
  },
  clearMocks: true
}
