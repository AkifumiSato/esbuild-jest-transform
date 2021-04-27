declare module 'esbuild' {
  export type OutputFile = any; /* 例 */
  export var buildSync: (item: any) => ({
    outputFiles: any
  })
}