module.exports = {
  clearMocks: true,
  preset: 'ts-jest',
  moduleFileExtensions: ['js', 'ts'],
  testMatch: ['**/*.spec.ts'],
  collectCoverage: true,
  coveragePathIgnorePatterns: ['node_modules', 'dist'],
  transform: {
    '^.+\\.ts$': 'ts-jest'
  },
  verbose: true
};
