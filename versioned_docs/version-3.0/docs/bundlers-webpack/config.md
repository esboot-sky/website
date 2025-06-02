---
sidebar_position: 1
---

# Config

`webpack` bundler的特定配置。

## Base Config Support

| Name               | Supported | Description |
| ------------------ | --------- | ----------- |
| server.proxy       | ✅         | --          |
| server.https       | ✅         | --          |
| server.http2       | ✅         | --          |
| sever.open         | ✅         | --          |
| sever.port         | ✅         | --          |
| outputPath         | ✅         | --          |
| publicPath         | ✅         | --          |
| useLangJsonPicker  | ✅         | --          |
| minimize           | ✅         | --          |
| jsMinifier         | ✅         | --          |
| jsMinifierOptions  | ✅         | --          |
| cssMinifier        | ✅         | --          |
| cssMinifierOptions | ✅         | --          |
| analyze            | ✅         | --          |
| alias              | ✅         | --          |
| define             | ✅         | --          |
| sourceMap          | ✅         | --          |
| externals          | ✅         | --          |
| copy               | ✅         | --          |
| svgr               | ✅         | --          |
| svgrOptions        | ✅         | --          |
| px2rem             | ✅         | --          |
| useTailwindcss     | ✅         | --          |
| tailwindcssOptions | ✅         | --          |

## Base Feature Support

- ✅ Compatibility
- ✅ Code splitting  

## mfsu

- 类型：`boolean`
- 默认值：`true`

是否开启[mfsu](https://module-federation.github.io/)。

关于mfsu的解释可以看下[umi MFSU](https://umijs.org/docs/guides/mfsu#mfsu)。

## mfsuOptions

参考[独立使用MFSU](https://umijs.org/blog/mfsu-independent-usage)。

## codeSplitting

参考[codesplitting](https://umijs.org/docs/docs/3.0/api/config#codesplitting)，配置完全相同，除了`jsStrategyOptions`。

在`granularChunks`模式下：

```ts
interface JsStrategyOptions {
  // 加入此数组中的库，才会被打包到公共的依赖中。
  frameworkBundles: string[];
}

// frameworkBundles的默认值为
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

`e.g.`

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

当以上所有的配置都无法满足的时候，`customConfig`可以让你完全自定义webpack配置。

`e.g.`

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

      // 一定要返回config
      return cfg;
    },
  };
});
```
