import * as path from "path";

import * as esbuild from "esbuild";
import { builtinModules } from "module";
import type { SyncTransformer, TransformedSource } from "@jest/transform";

const pkg = require(path.resolve("package.json"));

const external = [
  ...builtinModules,
  ...Object.keys(pkg.dependencies ?? {}),
  ...Object.keys(pkg.devDependencies ?? {}),
  ...Object.keys(pkg.peerDependencies ?? {}),
];

const transformer: SyncTransformer<esbuild.BuildOptions> = {
  process(_content, filename, { transformerConfig }) {
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

    return outputFiles!.reduce((cur, item) => {
      const key = item.path.includes(".map") ? "map" : "code";
      cur[key] = Buffer.from(item.contents).toString();
      return cur;
    }, {} as Exclude<TransformedSource, string>);
  },
};

module.exports = transformer;
