---
sidebar_position: 4
---

# Webpack Bundler

[webpack](https://webpack.js.org/) bundler的特定配置。

## Base Config Support

| Name               | Supported | Description                                                                 |
| ------------------ | --------- | --------------------------------------------------------------------------- |
| server.proxy       | ✅         | 配置代理功能，参考 [devServer.proxy](https://webpack.js.org/configuration/dev-server/#devserverproxy) |
| server.https       | ✅         | 与 [devServer.https](https://webpack.js.org/configuration/dev-server/#devserverhttps) 一致 |
| server.http2       | ✅         | 与 [devServer.http2](https://webpack.js.org/configuration/dev-server/#devserverhttp2) 一致 |
| server.open        | ✅         | 与 [devServer.open](https://webpack.js.org/configuration/dev-server/#devserveropen) 一致 |
| server.port        | ✅         | 与 [devServer.port](https://webpack.js.org/configuration/dev-server/#devserverport) 一致 |
| outputPath         | ✅         | 与 [output.path](https://webpack.js.org/configuration/output/#outputpath) 一致 |
| publicPath         | ✅         | 与 [output.publicPath](https://webpack.js.org/configuration/output/#outputpublicpath) 一致 |
| useLangJsonPicker  | ✅         | 是否开启 pick 语言 json 文件字段，配合 `langJsonPicker` 字段使用 |
| minimize           | ✅         | 一键关闭 `js` 和 `css` 的压缩功能 |
| jsMinifier         | ✅         | JavaScript 压缩工具选择（terser/swc/none） |
| jsMinifierOptions  | ✅         | `jsMinifier` 的配置项 |
| cssMinifier        | ✅         | CSS 压缩工具选择（cssnano/lightningcss/none） |
| cssMinifierOptions | ✅         | `cssMinifier` 的配置项 |
| analyze            | ✅         | 产物 size 分析，基于 webpack-bundle-analyzer |
| alias              | ✅         | 路径别名配置 |
| define             | ✅         | 基于 define-plugin 插件设置代码中的可用变量 |
| sourceMap          | ✅         | 是否开启 sourceMap |
| externals          | ✅         | 参考 [webpack.externals](https://webpack.js.org/configuration/externals/) |
| copy               | ✅         | 配置要复制到输出目录的文件或文件夹 |
| svgr               | ✅         | 是否开启 [svgr](https://react-svgr.com/docs/docs/3.0/webpack/) |
| svgrOptions        | ✅         | [svgrOptions](https://react-svgr.com/docs/docs/3.0/options/) 配置 |
| assetsInlineLimit  | ✅         | 配置 asset 内联限制 |
| px2rem             | ✅         | px 转 rem 配置，参考 [postcss-plugin-px2rem](https://www.npmjs.com/package/postcss-plugin-px2rem) |
| useTailwindcss     | ✅         | 是否使用 [tailwindcss](https://tailwindcss.com/) |

## Base Feature Support

- ✅ Compatibility
- ✅ Code splitting  

## mfsu

- 类型：`boolean`
- 默认值：`true`

是否开启 [mfsu](https://module-federation.github.io/)。

关于 mfsu 的解释可以看下 [umi MFSU](https://umijs.org/docs/guides/mfsu#mfsu)。

## mfsuOptions

参考 [独立使用MFSU](https://umijs.org/blog/mfsu-independent-usage)。

## codeSplitting

参考 [codesplitting](https://umijs.org/docs/docs/3.0/api/config#codesplitting)，配置完全相同，除了 `jsStrategyOptions`。

在 `granularChunks` 模式下：

```ts
interface JsStrategyOptions {
  // 加入此数组中的库，才会被打包到公共的依赖中。
  frameworkBundles: string[];
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

- 类型：`string[] | Function`
- 默认值：`[]`

配置额外的 babel 插件集。可传入插件集地址或插件集函数。

## extraBabelIncludes

- 类型：`Array<string | RegExp>`
- 默认值：`[]`

配置额外需要做 Babel 编译的 NPM 包或目录。常用于处理第三方库的兼容性。

```ts
export default {
  extraBabelIncludes: [
    // 支持绝对路径
    join(__dirname, '../../common'),
    // 支持 npm 包
    'react-monaco-editor',
    // 转译全部路径含有 @scope 的包
    /@scope/
  ],
};
```

`e.g.`

```ts
export default {
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
    'zustand'
  ],
}
```

## extraBabelPlugins

- 类型：`string[] | Function`
- 默认值：`[]`

配置额外的 babel 插件。可传入插件地址或插件函数。

**示例**：

```ts
export default defineConfig((compileConfig) => {
  const extraBabelPlugins: UserOpts['extraBabelPlugins'] = [];
  if (!compileConfig.isMobile) {
    extraBabelPlugins.push(getImportPluginsOfRsuite([]));
  }

  return {
    extraBabelPlugins,
  };
});
```

## customConfig

- 类型：`(config: WebpackConfig) => WebpackConfig`

当以上所有的配置都无法满足的时候，`customConfig` 可以让你完全自定义 webpack 配置。

**示例**：

```ts
export default defineConfig((compileConfig) => {
  return {
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
  };
});
```
