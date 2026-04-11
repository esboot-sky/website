---
sidebar_position: 5
---

# Vite Bundler

Vite-specific configuration for ESBoot.

## Base Config Support

The Vite bundler supports:

- `server.proxy`
- `server.open`
- `server.port`
- `outputPath`
- `publicPath`
- `useLangJsonPicker`
- `minimize`
- `jsMinifier`
- `jsMinifierOptions`
- `cssMinifier`
- `cssMinifierOptions`
- `analyze`
- `alias`
- `define`
- `sourceMap`
- `copy`
- `svgr`
- `svgrOptions`
- `assetsInlineLimit`
- `px2rem`
- `useTailwindcss`

Unsupported in Vite mode:

- `server.https`
- `server.http2`
- `externals`

## Base Feature Support

- Code splitting
- Compatibility is not currently supported at the same level as Webpack mode

## codeSplitting

Follows the same `codesplitting` mental model as Umi, except for `jsStrategyOptions`.

In `granularChunks` mode:

```ts
interface JsStrategyOptions {
  frameworkBundles: string[];
}
```

Default `frameworkBundles` are:

```ts
const FRAMEWORK_BUNDLES = ['react-dom', 'react'];
```

## customConfig

- **Type**: `(config: ViteConfig) => ViteConfig`

Allows full access to the generated Vite config.

```ts
export default defineConfig((compileConfig) => {
  return {
    customConfig: (cfg) => {
      return cfg;
    },
  };
});
```

## legacy

Whether to enable [@vitejs/plugin-legacy](https://github.com/vitejs/vite/tree/main/packages/plugin-legacy).

**Type**: `{ enable: boolean }`

**Default**: `{ enable: false }`

```ts
export default defineConfig({
  legacy: {
    enable: false,
  },
});
```
