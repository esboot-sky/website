---
sidebar_position: 6
---

# Rspack Bundler

[Rspack](https://rspack.dev/) bundler的特定配置。

Rspack 是一个基于 Rust 的高性能构建工具，由字节跳动 Web Infra 团队开发，旨在提供更快的构建速度。Rspack 与 Webpack 配置高度兼容。

## Common Config Support

| Name                         | Supported | Description |
| ---------------------------- | --------- | ----------- |
| isSP                         | ✅         | 是否使用单平台模式 |
| server.host                  | ✅         | 与 Rspack DevServer `host` 一致 |
| server.proxy                 | ✅         | 与 Rspack DevServer `proxy` 一致 |
| server.https                 | ✅         | 使用 Rspack DevServer `server: 'https'` |
| server.http2                 | ✅         | 使用 `spdy` server |
| server.open                  | ✅         | 与 Rspack DevServer `open` 一致 |
| server.port                  | ✅         | 与 Rspack DevServer `port` 一致 |
| outputPath                   | ✅         | 构建输出目录 |
| publicPath                   | ✅         | 部署应用包时的基础 URL |
| useLangJsonPicker            | ✅         | 是否开启 pick 语言 json 文件字段，配合 entry 的 `langJsonPicker` 字段使用 |
| minimize                     | ✅         | 一键关闭 Rspack minimizer |
| jsMinifier                   | ✅         | 当前固定使用 `SwcJsMinimizerRspackPlugin`；支持设置为 `none` 关闭 JS 压缩 |
| jsMinifierOptions            | ✅         | 会合并到 `SwcJsMinimizerRspackPlugin.minimizerOptions` |
| cssMinifier                  | ✅         | 当前固定使用 `LightningCssMinimizerRspackPlugin`；支持设置为 `none` 关闭 CSS 压缩 |
| cssMinifierOptions           | ✅         | 会合并到 `LightningCssMinimizerRspackPlugin.minimizerOptions` |
| analyze                      | ✅         | 产物 size 分析 |
| alias                        | ✅         | 路径别名配置 |
| define                       | ✅         | 通过 Rspack `DefinePlugin` / `EnvironmentPlugin` 注入 |
| sourceMap                    | ✅         | 是否开启 sourceMap |
| externals                    | ✅         | 与 Rspack `externals` 一致 |
| copy                         | ✅         | 通过 `CopyRspackPlugin` 复制文件或文件夹 |
| svgr                         | ✅         | Supports SVG as React components |
| svgrOptions                  | ✅         | [svgrOptions](https://react-svgr.com/docs/options/) 配置 |
| assetsInlineLimit            | ✅         | 配置 asset 内联限制 |
| px2rem                       | ✅         | px 转 rem 配置，参考 [postcss-plugin-px2rem](https://www.npmjs.com/package/postcss-plugin-px2rem) |
| css.modules.useStyleName     | ✅         | 是否启用 `styleName` 转换 |
| css.modules.localsConvention | ✅         | 传递给 `css-loader` 的 `modules.exportLocalsConvention` |
| css.tailwind.enable          | ✅         | 是否开启 Tailwind CSS |
| css.tailwind.version         | ✅         | 支持 `next` 和 `3` |
| css.tailwind.separateImports | ✅         | 传递给 ESBoot PostCSS 插件，用于 Tailwind import 处理 |
| css.fontZoom                 | ✅         | 字体缩放 PostCSS 配置 |
| legacy                       | ❌         | 未接入 |
| plugins                      | ✅         | ESBoot 插件系统配置 |
| experimental.reactCompiler   | ✅         | Rspack 2.1+ 通过 `builtin:swc-loader` 的 Rust React Compiler 启用 |

## Base Feature Support

- ✅ Compatibility (ES2020+)
- ✅ Code splitting

## CSS Modules & styleName Support

esboot-bundler-rspack 通过共享的 `react-style-name` transform 支持 JSX/TSX 中的 `styleName` 属性，并复用 CSS Modules 运行时映射。

### Features

- **Runtime Mapping**: `styleName="my-class"` 会转换为 `styles['my-class']` lookup。这样可以和 bundler 生成的 CSS Modules class name 保持一致。
- **CamelCase Fallback**: Automatically handles `css-loader` transforming kebab-case classes to camelCase property keys.
    - Example: `styleName="text2-cls"` is transformed to `(styles["text2-cls"] || styles["text2Cls"])`.
- **Dynamic preservation**: Preserves `className` expressions (e.g. `<div className={styles.foo} styleName="bar">`) by concatenating them.

### Configuration

The transform is enabled automatically when using `bundler-rspack`, unless `css.modules.useStyleName` is set to `false`.

## React Compiler

Rspack 2.1+ supports native Rust React Compiler through `builtin:swc-loader`.

```ts
export default defineConfig({
  experimental: {
    reactCompiler: {
      enable: true,
      target: '19',
    },
  },
});
```

- `target: '19'` maps to `reactCompiler: true`.
- `target: '18'` maps to `reactCompiler: { target: '18' }`.
- `enable: false` disables the Rspack React Compiler option.

## codeSplitting

配置风格参考 [codesplitting](https://umijs.org/docs/docs/3.0/api/config#codesplitting)，以下是 Rspack adapter 当前支持的策略。

:::tip 配置位置

该配置可以直接写在最外层（推荐，各 bundler 共享配置），也可以在 `bundlerOptions.codeSplitting` 内单独进行定制或覆盖。

:::

该配置仅影响生产构建；当前实现中 `minimize: false` 会跳过生产优化，因此也会跳过 `codeSplitting`。

Rspack 支持以下 `jsStrategy`：

- `granularChunks`
- `bigVendors`
- `depPerChunk`

在 `granularChunks` 模式下：

```ts
interface JsStrategyOptions {
  // 加入此数组中的库，才会被打包到公共的依赖中。
  frameworkBundles: string[];
  // 自定义拆包分组，支持数组（混合字符串/正则）、正则或函数映射（支持 priority/enforce 等高级配置）
  customGroups?: Record<
    string,
    (string | RegExp)[] | RegExp | ((id: string) => boolean) | CustomGroupConfig
  >;
}

// frameworkBundles 的默认值为
const FRAMEWORK_BUNDLES = [
  // React Series
  'react-dom',
  'react',
  'react-intl',
  'react-router',
  'react-router-dom',
  'classnames',
  //
  'lodash',
  'dayjs',
  'zustand',
  '@loadable/component',
];
```

## extraBabelIncludes

- 类型：`bundlerOptions.extraBabelIncludes: Array<string | RegExp>`
- 默认值：`[]`

配置额外需要通过 Rspack `builtin:swc-loader` 转译的 NPM 包或目录。可传入绝对路径、相对路径、NPM 包名或正则。

## customConfig

- 类型：`bundlerOptions.customConfig: (config: RspackConfig, cfg: ESBootConfig) => RspackConfig`

当以上所有的配置都无法满足的时候，`bundlerOptions.customConfig` 可以让你完全自定义 rspack 配置。

**示例**：

```ts
export default defineConfig((compileConfig) => {
  return {
    bundlerOptions: {
      customConfig: (cfg) => {
        // do something

        // 一定要返回 config
        return cfg;
      },
    },
  };
});
```

## Bundler Options Summary

| Name                              | Supported | Description |
| --------------------------------- | --------- | ----------- |
| bundlerOptions.customConfig       | ✅         | 自定义最终 Rspack 配置 |
| bundlerOptions.extraBabelIncludes | ✅         | 额外需要 SWC 转译的包或目录 |
| bundlerOptions.codeSplitting      | ✅         | 配置 `splitChunks` 策略 |
