---
sidebar_position: 6
---

# Rspack Bundler

[Rspack](https://rspack.dev/) bundler的特定配置。

Rspack 是一个基于 Rust 的高性能构建工具，由 字节团队开发，旨在提供更快的构建速度。Rspack 与 Webpack 配置高度兼容，可以无缝迁移。

## Base Config Support

| Name               | Supported | Description                                                                 |
| ------------------ | --------- | --------------------------------------------------------------------------- |
| server.proxy       | ✅         |                                                                             |
| server.https       | ✅         |                                                                             |
| server.http2       | ✅         |                                                                             |
| server.open        | ✅         |                                                                             |
| server.port        | ✅         |                                                                             |
| outputPath         | ✅         |                                                                             |
| publicPath         | ✅         |                                                                             |
| useLangJsonPicker  | ✅         |                                                                             |
| minimize           | ✅         | Uses `SwcJsMinimizerRspackPlugin` & `LightningCssMinimizerRspackPlugin`     |
| jsMinifier         | ✅         | Defaults to `swc`. Set to `'none'` to disable.              |
| jsMinifierOptions  | ✅         |                                                                             |
| cssMinifier        | ✅         | Defaults to `lightningcss`. Set to `'none'` to disable.     |
| cssMinifierOptions | ✅         |                                                                             |
| analyze            | ✅         |                                                                             |
| alias              | ✅         |                                                                             |
| define             | ✅         |                                                                             |
| sourceMap          | ✅         |                                                                             |
| externals          | ✅         |                                                                             |
| copy               | ✅         |                                                                             |
| svgr               | ✅         | Supports SVG as React components                                            |
| svgrOptions        | ✅         |                                                                             |
| assetsInlineLimit  | ✅         |                                                                             |
| px2rem             | ✅         |                                                                             |
| useTailwindcss     | ✅         |                                                                             |

:::info Note
Using `swc_core` v55.0.0 and `browserslist` for target configuration.
:::

## Base Feature Support

- ✅ Compatibility (ES2020+)
- ✅ Code splitting

## CSS Modules & styleName Support

esboot-bundler-rspack now includes a custom **WASM Plugin** (`rspack-plugin-stylename`) to support `styleName` attributes in JSX/TSX files, providing fully scoped CSS modules similar to existing `babel-plugin-react-css-modules`.

### Features

- **High Performance**: Written in Rust, compiled to WASM, running inside SWC loader.
- **Runtime Mapping**: Unlike build-time hashing, the plugin transforms `styleName="my-class"` into `styles['my-class']` lookup at runtime. This ensures 100% consistency with the bundler's generated class names.
- **CamelCase Fallback**: Automatically handles `css-loader` transforming kebab-case classes to camelCase property keys.
    - Example: `styleName="text2-cls"` is transformed to `(styles["text2-cls"] || styles["text2Cls"])`.
- **Dynamic preservation**: Preserves `className` expressions (e.g. `<div className={styles.foo} styleName="bar">`) by concatenating them.

### Configuration

The plugin is enabled automatically when using `bundler-rspack`.
Cache files for the WASM plugin are stored in `node_modules/.cache/esboot/.swc` to keep your project clean.

## customConfig

- 类型：`(config: RspackConfig) => RspackConfig`

当以上所有的配置都无法满足的时候，`customConfig` 可以让你完全自定义 rspack 配置。

**示例**：

```ts
export default defineConfig((compileConfig) => {
  return {
    customConfig: (cfg) => {
      // do something
      
      // 一定要返回 config
      return cfg;
    },
  };
});
```
