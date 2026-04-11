---
sidebar_position: 6
---

# Rspack Bundler

Rspack-specific configuration for ESBoot.

[Rspack](https://rspack.dev/) is a high-performance Rust-based bundler with strong compatibility with Webpack-style configuration.

## Base Config Support

Rspack mode supports the same major ESBoot options as Webpack mode, including:

- `server.proxy`
- `server.https`
- `server.http2`
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
- `externals`
- `copy`
- `svgr`
- `svgrOptions`
- `assetsInlineLimit`
- `px2rem`
- `useTailwindcss`

:::info Note

Rspack mode currently uses `swc_core` and `browserslist` for target configuration.

:::

## Base Feature Support

- Compatibility (ES2020+)
- Code splitting

## CSS Modules and styleName Support

`esboot-bundler-rspack` includes a custom WASM plugin, `rspack-plugin-stylename`, to support `styleName` in JSX and TSX.

### Highlights

- Written in Rust and compiled to WASM
- Converts `styleName="foo"` into runtime `styles[...]` lookups
- Includes camelCase fallback for kebab-case CSS class names
- Preserves existing `className` expressions and combines them correctly

The plugin is enabled automatically when using `bundler-rspack`.

## customConfig

- **Type**: `(config: RspackConfig) => RspackConfig`

Use this when ESBoot's higher-level config is not enough and you need direct Rspack control.

```ts
export default defineConfig((compileConfig) => {
  return {
    customConfig: (cfg) => {
      return cfg;
    },
  };
});
```
