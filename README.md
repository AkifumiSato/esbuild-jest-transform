# esbuild-jest-transform
esbuild jest plugin.
You can set the build option of esbuild by putting jest.esbuild.js.

[esbuild config](https://github.com/evanw/esbuild/blob/v0.7.6/lib/types.ts)

## Install
```bash
npm install -D esbuild-jest-transform
```

## Setup
jest.config.js

```json
"transform": {
  "^.+\\.jsx?$": "swc-jest"
},
```

## config
jest.esbuld.js
```js
module.exports = {
  target: 'es2015',
}
```

