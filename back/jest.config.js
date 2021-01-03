module.exports = {
  roots: [
    "<rootDir>/src"
  ],
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
    "/src/routes/main.router.ts",
    "/src/routes/anonymous.routes.ts",
    "/src/routes/logged.in.routes.ts",
    "/src/tests-related/",
    "/src/my-day-api.ts",
    "index.ts",
    ".d.ts"
  ],
  setupFiles: ["dotenv-flow/config"],
};