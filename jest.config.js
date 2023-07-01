/*
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

module.exports = {
  collectCoverage: true,
  collectCoverageFrom: [
    '<rootDir>/src/**/*.ts'
  ],
  coverageDirectory: 'coverage',
  // An object that configures minimum threshold enforcement for coverage results
  // coverageThreshold: undefined,
  roots: [
    '<rootDir>'
  ],

  transform: {
    '.+\\.ts$': 'ts-jest'
  }
}
