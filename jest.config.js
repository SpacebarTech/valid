module.exports = {
  collectCoverageFrom: [
    "src/**/!(index).{js,ts}",
  ],
  coverageDirectory: "coverage",
  testMatch: [
		"<rootDir>/src/lib/**/?(*.)(spec|test).(js|ts)?(x)",
		"<rootDir>/src/helpers/**/?(*.)(spec|test).(js|ts)?(x)",
  ],
  reporters: process.env.CI ? undefined : ["jest-spec-reporter"],
  rootDir: ".",
  moduleFileExtensions: [
    "ts",
    "js",
  ],
  transform: {
    "^.+\\.ts$": "ts-jest",
  },
  testEnvironment: "node",
};
