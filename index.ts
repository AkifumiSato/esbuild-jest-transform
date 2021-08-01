import * as path from "path";
import * as fs from "fs";
import * as esbuild from "esbuild";
import { builtinModules } from "module";
import { OutputFile } from "esbuild";

const pkg = require(path.resolve("package.json"));
const configFilePath = path.resolve("jest.esbuild");
const config = fs.existsSync(configFilePath) ? require(configFilePath) : {};

const external = [
  ...builtinModules,
  ...Object.keys(pkg.dependencies ?? {}),
  ...Object.keys(pkg.devDependencies ?? {}),
  ...Object.keys(pkg.peerDependencies ?? {}),
];

type BuildOutput = {
  map?: string;
  code?: string;
};

module.exports = {
  process(_content: string, filename: string): BuildOutput {
    const { outputFiles } = esbuild.buildSync({
      outdir: "./dist",
      minify: false,
      bundle: true,
      write: false,
      sourcemap: true,
      ...config,
      entryPoints: [filename],
      external,
    });

    return outputFiles?.reduce((cur: BuildOutput, item: OutputFile) => {
      const key = item.path.includes(".map") ? "map" : "code";
      cur[key] = Buffer.from(item.contents).toString();
      return cur;
    }, {}) ?? {};
  },
};
