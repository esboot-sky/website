---
sidebar_position: 4
---

# Webpack Bundler

Webpack-specific configuration for ESBoot.

## Base Config Support

The following options are supported by the Webpack bundler:

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

## Base Feature Support

- Compatibility
- Code splitting

## mfsu

- **Type**: `boolean`
- **Default**: `true`

Enable or disable [mfsu](https://module-federation.github.io/).

## mfsuOptions

See [Independent MFSU usage](https://umijs.org/blog/mfsu-independent-usage).

## codeSplitting

ESBoot follows the same shape as Umi's `codesplitting`, except for `jsStrategyOptions`.

Under `granularChunks` mode:

```ts
interface JsStrategyOptions {
  frameworkBundles: string[];
}
```

The default `frameworkBundles` include frequently-used libraries such as:

- `react`
- `react-dom`
- `react-router`
- `react-router-dom`
- `react-intl`
- `classnames`
- `lodash`
- `dayjs`
- `zustand`
- `@loadable/component`

## extraBabelPresets

- **Type**: `string[] | Function`
- **Default**: `[]`

Extra Babel preset collections.

## extraBabelIncludes

- **Type**: `Array<string | RegExp>`
- **Default**: `[]`

Force extra npm packages or directories through Babel compilation, usually for compatibility.

## extraBabelPlugins

- **Type**: `string[] | Function`
- **Default**: `[]`

Register extra Babel plugins.

## customConfig

- **Type**: `(config: WebpackConfig) => WebpackConfig`

Use this when the built-in ESBoot options are not enough and you need direct Webpack access.

```ts
export default defineConfig((compileConfig) => {
  return {
    customConfig: (cfg) => {
      Object.assign(cfg?.devServer ?? {}, {
        allowedHosts: ['127.1'],
      });

      return cfg;
    },
  };
});
```
