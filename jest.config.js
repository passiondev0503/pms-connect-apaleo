/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  setupFiles: ['./jest-setup.ts'],
  setupFilesAfterEnv: ['./jest-apaleo-init.ts'],
  testTimeout:90000
};