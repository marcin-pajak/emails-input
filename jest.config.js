module.exports = {
  coveragePathIgnorePatterns: ['/node_modules/', '/test/'],
  coverageReporters: ['lcov', 'text', 'text-summary'],
  collectCoverageFrom: ['src/**/*.{ts}'],
  moduleNameMapper: {
    '\\.(scss)$': '<rootDir>/src/__mocks__/styles.ts',
  },
  preset: 'ts-jest',
  resetMocks: true,
  roots: ['<rootDir>/src'],
  testEnvironment: 'jsdom',
};
