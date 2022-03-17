module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  transform: {
    '^.+\\.jsx?$': './babel-jest-wrapper.js',
    '^.+\\.tsx?$': './babel-jest-wrapper.js'
  },
  globals: {
    'ts-jest': {
      tsconfig: './tsconfig.json'
    },
  },
  setupFilesAfterEnv: ['./enzyme.config.js'],
  moduleNameMapper: {
    '^types/(.*)$': '<rootDir>/types/$1'
  }
}