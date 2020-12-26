module.exports = {
  testMatch: ["**/__tests__/**/*.+(ts)", "**/?(*.)+(spec|test).+(ts)"],
  transform: {
    "^.+\\.(ts)$": "ts-jest",
  },
  collectCoverageFrom: [
    "<rootDir>/src/**/*.ts",
  ],
  coveragePathIgnorePatterns: [
    "/node_modules/",
    "/src/dal/mockdb/",
    "/src/constraints/",
    "/src/my-day-api.ts",
    "index.ts",
    ".d.ts"
  ],
  setupFiles: ["dotenv-flow/config"],
};