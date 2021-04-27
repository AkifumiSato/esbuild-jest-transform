# esbuild-jest-transform
[![npm version](https://badge.fury.io/js/esbuild-jest-transform.svg)](https://badge.fury.io/js/esbuild-jest-transform)

esbuild jest plugin.
You can set the build option of esbuild by putting jest.esbuild.js.

[esbuild config](https://github.com/evanw/esbuild/blob/v0.7.6/lib/types.ts)

## Install
```bash
npm install -D esbuild esbuild-jest-transform
```

## Setup
jest.config.js

```json
"transform": {
  "^.+\\.jsx?$": "esbuild-jest-transform"
},
```

## config
jest.esbuild.js
```js
module.exports = {
  target: 'es2015',
}
```

