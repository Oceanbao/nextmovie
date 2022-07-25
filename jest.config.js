const nextJest = require('next/jest')
const { pathsToModuleNameMapper } = require("ts-jest")
const { compilerOptions } = require("./tsconfig")

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './',
})

// Add any custom config to be passed to Jest
const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/'],
  moduleNameMapper: {
    // Handle module aliases (this will be automatically configured for you soon)
    // '^@/components/(.*)$': '<rootDir>/src/components/$1',
    // '^@/pages/(.*)$': '<rootDir>/src/pages/$1',
    '.+\\.(css|styl|less|sass|scss)$': 'jest-css-modules-transform',
    // Handle CSS imports (with CSS modules)
    // https://jestjs.io/docs/webpack#mocking-css-modules
    // '^.+\\.module\\.(css|sass|scss)$': 'identity-obj-proxy',

    // Handle CSS imports (without CSS modules)
    // '^.+\\.(css|sass|scss)$': '<rootDir>/__mocks__/styleMock.js',

    // Handle image imports
    // https://jestjs.io/docs/webpack#handling-static-assets
    // '^.+\\.(png|jpg|jpeg|gif|webp|avif|ico|bmp|svg)$/i': `<rootDir>/__mocks__/fileMock.js`,
    ...pathsToModuleNameMapper(compilerOptions.paths),
  },
  testEnvironment: 'jest-environment-jsdom',
}

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(customJestConfig)
