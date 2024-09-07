---
sidebar_position: 1
---

# Config

`webpack` bundler webpack的特定配置。

## mfsu

- 类型：`boolean`
- 默认值：`true`

是否开启[mfsu](https://module-federation.github.io/)

## mfsuOptions

## codeSplitting

`v2.5.0`

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

## extraBabelPlugins

- 类型：`string[] | Function`
- 默认值：`[]`

配置额外的 babel 插件。可传入插件地址或插件函数。

## customConfig
