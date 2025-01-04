/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  testMatch: ["<rootDir>/tests/e2e/**/*.test.ts"],
  testPathIgnorePatterns: ["/node_modules"],
};
