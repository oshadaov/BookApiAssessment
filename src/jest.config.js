module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    transform: {
      '^.+\\.ts$': ['babel-jest', { presets: ['@babel/preset-env', '@babel/preset-typescript'] }]
    },
    moduleFileExtensions: ['ts', 'js'],
    testMatch: ['**/src/tests/**/*.test.ts'],
    globals: {
      'ts-jest': {
        isolatedModules: true
      }
    }
  };
  