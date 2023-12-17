/** @type {import('jest').Config} */
module.exports = {
  collectCoverage: true,
  coverageThreshold: {
    global: { branches: 100, functions: 100, lines: 100, statements: 100 }
  },
  transform: {
    "^.+\\.[jt]sx?$": [
      "./"
    ]
  }
};
