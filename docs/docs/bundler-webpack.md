---
sidebar_position: 4
---

# Webpack Bundler

[webpack](https://webpack.js.org/) bundler的特定配置。

## Common Config Support

| Name                         | Supported | Description |
| ---------------------------- | --------- | ----------- |
| isSP                         | ✅         | 是否使用单平台模式 |
| server.host                  | ✅         | 与 [devServer.host](https://webpack.js.org/configuration/dev-server/#devserverhost) 一致 |
| server.proxy                 | ✅         | 配置代理功能，参考 [devServer.proxy](https://webpack.js.org/configuration/dev-server/#devserverproxy) |
| server.https                 | ✅         | 与 [devServer.server](https://webpack.js.org/configuration/dev-server/#devserverserver) 一致 |
| server.http2                 | ✅         | 使用 `spdy` server |
| server.open                  | ✅         | 与 [devServer.open](https://webpack.js.org/configuration/dev-server/#devserveropen) 一致 |
| server.port                  | ✅         | 与 [devServer.port](https://webpack.js.org/configuration/dev-server/#devserverport) 一致 |
| outputPath                   | ✅         | 与 [output.path](https://webpack.js.org/configuration/output/#outputpath) 一致 |
| publicPath                   | ✅         | 与 [output.publicPath](https://webpack.js.org/configuration/output/#outputpublicpath) 一致 |
| useLangJsonPicker            | ✅         | 是否开启 pick 语言 json 文件字段，配合 entry 的 `langJsonPicker` 字段使用 |
| minimize                     | ✅         | 一键关闭 `js` 和 `css` 的压缩功能 |
| jsMinifier                   | ✅         | 当前固定使用 `terser-webpack-plugin`；支持设置为 `none` 关闭 JS 压缩 |
| jsMinifierOptions            | ✅         | 会合并到 `terserOptions` |
| cssMinifier                  | ✅         | 当前固定使用 `css-minimizer-webpack-plugin`；支持设置为 `none` 关闭 CSS 压缩 |
| cssMinifierOptions           | ✅         | 会传给 `css-minimizer-webpack-plugin` |
| analyze                      | ✅         | 产物 size 分析，基于 webpack-bundle-analyzer |
| alias                        | ✅         | 路径别名配置 |
| define                       | ✅         | 基于 define-plugin 插件设置代码中的可用变量 |
| sourceMap                    | ✅         | 是否开启 sourceMap |
| externals                    | ✅         | 参考 [webpack.externals](https://webpack.js.org/configuration/externals/) |
| copy                         | ✅         | 配置要复制到输出目录的文件或文件夹 |
| svgr                         | ✅         | 是否开启 [svgr](https://react-svgr.com/docs/webpack/) |
| svgrOptions                  | ✅         | [svgrOptions](https://react-svgr.com/docs/options/) 配置 |
| assetsInlineLimit            | ✅         | 配置 asset 内联限制 |
| px2rem                       | ✅         | px 转 rem 配置，参考 [postcss-plugin-px2rem](https://www.npmjs.com/package/postcss-plugin-px2rem) |
| css.modules.useStyleName     | ✅         | 是否启用 Babel `styleName` 转换 |
| css.modules.localsConvention | ✅         | CSS Modules 导出命名规则 |
| css.tailwind.enable          | ✅         | 是否开启 Tailwind CSS |
| css.tailwind.version         | ✅         | 支持 `next` 和 `3` |
| css.tailwind.separateImports | ✅         | 传递给 ESBoot PostCSS 插件，用于 Tailwind import 处理 |
| css.fontZoom                 | ✅         | 字体缩放 PostCSS 配置 |
| legacy                       | ✅         | legacy 模式下缺失的 `styleName` 会降级为 warning |
| plugins                      | ✅         | ESBoot 插件系统配置 |
| experimental.reactCompiler   | ✅         | 通过 `babel-plugin-react-compiler` 启用 |

## Base Feature Support

- ✅ Compatibility
- ✅ Code splitting  

## mfsu

- 类型：`bundlerOptions.mfsu: boolean`
- 默认值：`true`

是否开启 [mfsu](https://module-federation.github.io/)。

关于 mfsu 的解释可以看下 [umi MFSU](https://umijs.org/docs/guides/mfsu#mfsu)。

## mfsuOptions

参考 [独立使用MFSU](https://umijs.org/blog/mfsu-independent-usage)。

## buildCache

- 类型：`bundlerOptions.buildCache: boolean`
- 默认值：`false`

是否在 CI 生产构建中也启用 webpack filesystem cache。开发模式默认开启 filesystem cache；非 CI 生产构建默认开启；CI 生产构建默认关闭，设置 `bundlerOptions.buildCache: true` 后可开启。

## codeSplitting

配置风格参考 [codesplitting](https://umijs.org/docs/docs/3.0/api/config#codesplitting)，以下是 Webpack adapter 当前支持 the 策略。

:::tip 配置位置

该配置可以直接写在最外层（推荐，各 bundler 共享配置），也可以在 `bundlerOptions.codeSplitting` 内单独进行定制或覆盖。

:::

该配置仅影响生产构建；当前实现中 `minimize: false` 会跳过生产优化，因此也会跳过 `codeSplitting`。

Webpack 支持以下 `jsStrategy`：

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

## extraBabelPresets

- 类型：`bundlerOptions.extraBabelPresets: string[]`
- 默认值：`[]`

配置额外的 Babel preset。可传入 preset 地址。

## extraBabelIncludes

- 类型：`bundlerOptions.extraBabelIncludes: Array<string | RegExp>`
- 默认值：`[]`

配置额外需要做 Babel 编译的 NPM 包或目录。常用于处理第三方库的兼容性。

```ts
export default {
  bundlerOptions: {
    extraBabelIncludes: [
      // 支持绝对路径
      join(__dirname, '../../common'),
      // 支持 npm 包
      'react-monaco-editor',
      // 转译全部路径含有 @scope 的包
      /@scope/,
    ],
  },
};
```

`e.g.`

```ts
export default {
  bundlerOptions: {
    extraBabelIncludes: [
      /filter-obj/i,
      /immer/i,
      /query-string/i,
      /react-intl/i,
      /common/i,
      /d3-/i,
      /@tanstack/i,
      /@react-spring/i,
      /@floating-ui/i,
      /radash/i,
      /tailwind-merge/i,
      /@radix-ui/i,
      'zustand',
    ],
  },
};
```

## extraBabelPlugins

- 类型：`bundlerOptions.extraBabelPlugins: BabelPlugin[]`
- 默认值：`[]`

配置额外的 Babel 插件。

**示例**：

```ts
export default defineConfig((compileConfig) => {
  const extraBabelPlugins: BabelPlugin[] = [];
  if (!compileConfig.isMobile) {
    extraBabelPlugins.push(getImportPluginsOfRsuite([]));
  }

  return {
    bundlerOptions: {
      extraBabelPlugins,
    },
  };
});
```

## customConfig

- 类型：`bundlerOptions.customConfig: (config: WebpackConfig, cfg: ESBootConfig) => WebpackConfig`

当以上所有的配置都无法满足的时候，`bundlerOptions.customConfig` 可以让你完全自定义 webpack 配置。

**示例**：

```ts
export default defineConfig((compileConfig) => {
  return {
    bundlerOptions: {
      customConfig: (cfg) => {
        Object.assign(cfg?.devServer ?? {}, {
          allowedHosts: ['127.1'],
          headers: {
            'Access-Control-Allow-Origin': '*',
          },
        });

        Object.assign(cfg.output ?? {}, {
          library: {
            name: `${pkg.name}-[name]`,
            type: 'umd',
          },
          uniqueName: `webpackJsonp_${pkg.name}`,
        });

        // 一定要返回 config
        return cfg;
      },
    },
  };
});
```

## Bundler Options Summary

| Name                               | Supported | Description |
| ---------------------------------- | --------- | ----------- |
| bundlerOptions.mfsu                | ✅         | 是否开启 MFSU |
| bundlerOptions.mfsuOptions         | ✅         | 修改 MFSU 配置 |
| bundlerOptions.buildCache          | ✅         | CI 生产构建是否启用 filesystem cache |
| bundlerOptions.extraBabelPlugins   | ✅         | 额外 Babel 插件 |
| bundlerOptions.extraBabelPresets   | ✅         | 额外 Babel preset |
| bundlerOptions.extraBabelIncludes  | ✅         | 额外需要 Babel 转译的包或目录 |
| bundlerOptions.customConfig        | ✅         | 自定义最终 Webpack 配置 |
| bundlerOptions.codeSplitting       | ✅         | 配置 `splitChunks` 策略 |
