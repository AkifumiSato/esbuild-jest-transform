import * as path from "path";

import * as esbuild from "esbuild";
import { builtinModules } from "module";
import { OutputFile } from "esbuild";

const pkg = require(path.resolve("package.json"));

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

// Very partial type - should maybe use the actual TransformOptions type export from Jest's definitions
type TransformOptions = {
  transformerConfig: {}
}

module.exports = {
  process(_content: string, filename: string, { transformerConfig }: TransformOptions ): BuildOutput {
    const { outputFiles } = esbuild.buildSync({
      outdir: "./dist",
      minify: false,
      bundle: true,
      write: false,
      sourcemap: true,
      ...transformerConfig,
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
