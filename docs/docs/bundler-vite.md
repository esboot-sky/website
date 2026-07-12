---
sidebar_position: 5
---

# Vite Bundler

[vite](https://vitejs.dev/) bundler的特定配置。

## Common Config Support

| Name                         | Supported | Description |
| ---------------------------- | --------- | ----------- |
| isSP                         | ✅         | 是否使用单平台模式 |
| server.host                  | ✅         | 与 [Vite server.host](https://vitejs.dev/config/server-options.html#server-host) 一致 |
| server.proxy                 | ✅         | 配置代理功能，参考 [Vite server.proxy](https://vitejs.dev/config/server-options.html#server-proxy) |
| server.https                 | ❌         | 暂不支持 |
| server.http2                 | ❌         | 暂不支持 |
| server.open                  | ❌         | 当前 Vite adapter 使用 Express + Vite middleware，自建 server 未消费 open 行为 |
| server.port                  | ✅         | 与 [Vite server.port](https://vitejs.dev/config/server-options.html#server-port) 一致。注意：`ESBoot` 会同时使用 `port` 和 `port + 1`，比如设置了 `8080`，那么会同时使用 `8080` 和 `8081`，所以如果多个项目记得至少隔 2 |
| outputPath                   | ✅         | 构建输出目录 |
| publicPath                   | ✅         | 部署应用包时的基础 URL |
| useLangJsonPicker            | ✅         | 是否开启 pick 语言 json 文件字段，配合 entry 的 `langJsonPicker` 字段使用 |
| minimize                     | ✅         | 一键关闭 `js` 和 `css` 的压缩功能 |
| jsMinifier                   | ✅         | `none` 会关闭 JS 压缩；其它值保持 Vite 当前压缩链路，`terser` 只会写入 `terserOptions`，不会切换 `build.minify` |
| jsMinifierOptions            | ✅         | 当 `jsMinifier` 为 `terser` 时合并到 `build.terserOptions` |
| cssMinifier                  | ✅         | `none` 会关闭 CSS 压缩；`lightningcss` 会设置 `build.cssMinify = 'lightningcss'`；其它值保持 Vite 默认行为 |
| cssMinifierOptions           | ✅         | 当 `cssMinifier` 为 `lightningcss` 时传给 `css.lightningcss` |
| analyze                      | ✅         | 产物 size 分析 |
| alias                        | ✅         | 路径别名配置 |
| define                       | ✅         | 定义全局常量替换 |
| sourceMap                    | ✅         | 是否开启 sourceMap |
| externals                    | ❌         | Vite bundler 不支持 externals 配置 |
| copy                         | ✅         | 配置要复制到输出目录的文件或文件夹 |
| svgr                         | ✅         | 是否开启 [svgr](https://react-svgr.com/) |
| svgrOptions                  | ✅         | [svgrOptions](https://react-svgr.com/docs/options/) 配置 |
| assetsInlineLimit            | ✅         | 配置 asset 内联限制 |
| px2rem                       | ✅         | px 转 rem 配置，参考 [postcss-plugin-px2rem](https://www.npmjs.com/package/postcss-plugin-px2rem) |
| css.modules.useStyleName     | ✅         | 是否转换 JSX/TSX 中的 `styleName` |
| css.modules.localsConvention | ✅         | CSS Modules 导出命名规则；`asIs` 会映射为 Vite 默认行为 |
| css.tailwind.enable          | ✅         | 是否开启 Tailwind CSS |
| css.tailwind.version         | ✅         | 支持 `next` 和 `3` |
| css.tailwind.separateImports | ✅         | 传递给 ESBoot PostCSS 插件，用于 Tailwind import 处理 |
| css.fontZoom                 | ✅         | 字体缩放 PostCSS 配置 |
| legacy                       | ❌         | 根配置 `legacy` 未接入 Vite；请使用 `bundlerOptions.legacy` |
| plugins                      | ✅         | ESBoot 插件系统配置 |
| experimental.reactCompiler   | ✅         | 生产构建中通过 `babel-plugin-react-compiler` 启用 |

## Base Feature Support

- ✅ Code splitting
- ✅ Compatibility via `bundlerOptions.legacy`

## codeSplitting

配置风格参考 [codesplitting](https://umijs.org/docs/docs/3.0/api/config#codesplitting)，以下是 Vite adapter 当前支持的策略。

该配置仅影响生产构建。

Vite 支持以下 `jsStrategy`：

- `granularChunks`
- `bigVendors`

在 `granularChunks` 模式下：

```ts
interface JsStrategyOptions {
  // 加入此数组中的库，才会被打包到公共的依赖中。
  frameworkBundles: string[];
}

// frameworkBundles 的默认值为
const FRAMEWORK_BUNDLES = [
  'react-dom',
  'react',
];
```

## customConfig

- 类型：`bundlerOptions.customConfig: (config: ViteConfig, cfg: ESBootConfig) => ViteConfig`

当以上所有的配置都无法满足的时候，`bundlerOptions.customConfig` 可以让你完全自定义 vite 配置。

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

## legacy

是否启用[@vitejs/plugin-legacy](https://github.com/vitejs/vite/tree/main/packages/plugin-legacy)。

**类型**：`bundlerOptions.legacy: { enable: boolean }`

**默认值**：`{ enable: false }`

**示例**：

```ts
export default defineConfig({
  bundlerOptions: {
    legacy: {
      enable: false,
    },
  },
});
```

## frameworkProvider

- 类型：`bundlerOptions.frameworkProvider: ViteFrameworkProvider`

自定义 Vite 框架插件提供器。默认使用 React 插件；插件（例如 Vue 插件）可以通过这个配置替换默认框架插件。

## Bundler Options Summary

| Name                         | Supported | Description |
| ---------------------------- | --------- | ----------- |
| bundlerOptions.customConfig  | ✅         | 自定义最终 Vite 配置 |
| bundlerOptions.frameworkProvider | ✅     | 自定义框架插件提供器 |
| bundlerOptions.legacy        | ✅         | 启用 `@vitejs/plugin-legacy` |
| bundlerOptions.codeSplitting | ✅         | 配置 Vite/Rollup `manualChunks` 策略 |
