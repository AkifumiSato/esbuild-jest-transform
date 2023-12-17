import * as path from "path";

import * as esbuild from "esbuild";
import type { SyncTransformer } from "@jest/transform";

const loaderFromFilename = (filename: string): esbuild.Loader => {
  const ext = path.extname(filename)?.toLowerCase().substring(1) ?? "";
  switch (ext) {
    case "js":
    case "jsx":
    case "ts":
    case "tsx":
    case "json":
      return ext;
    default:
      return "text";
  }
}

const transformer: SyncTransformer<esbuild.TransformOptions> = {
  process(content, sourcefile, { transformerConfig }) {
    const loader = loaderFromFilename(sourcefile);
    const { code, map } = esbuild.transformSync(content, {
      loader,
      format: "cjs",
      minify: false,
      target: "esnext",
      sourcemap: "inline",
      sourcefile,
      sourcesContent: true,
      ...transformerConfig,
    });

    return { code, map };
  },
};

module.exports = transformer;
