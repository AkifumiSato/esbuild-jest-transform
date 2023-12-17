# esbuild-jest-transform
[![npm version](https://badge.fury.io/js/esbuild-jest-transform.svg)](https://badge.fury.io/js/esbuild-jest-transform)

esbuild jest plugin.
You can set the build options of esbuild by passing them as transform options.

[esbuild config](https://github.com/evanw/esbuild/blob/v0.7.6/lib/types.ts)

## Install
```bash
npm install -D esbuild esbuild-jest-transform
```

## Setup
jest.config.js

```json
"transform": {
  "^.+\\.[jt]sx?$": "esbuild-jest-transform"
},
```

## config
jest.config.js

```json
"transform": {
  "^.+\\.[jt]sx?$": [
    "esbuild-jest-transform",
    {
      "target": "es2015",
    }
  ]
},
```


