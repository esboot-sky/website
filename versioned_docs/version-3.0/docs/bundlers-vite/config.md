---
sidebar_position: 1
---

# Config

`vite` bundler的特定配置。

## Base Config Support

| Name | Supported | Description |
|--------------------|-----------|-------------|
| server.proxy | ✅ | -- |
| server.https | ❌ | -- |
| server.http2 | ❌ | -- |
| sever.open | ✅ | -- |
| sever.port | ✅ | 注意：`esboot`会同时使用`port`和`port + 1`，比如设置了`8080`，那么会同时使用`8080`和`8081`，所以如果多个项目记得至少隔2。 |
| outputPath | ✅ | -- |
| publicPath | ✅ | -- |
| useLangJsonPicker | ✅ | -- |
| minimize | ✅ | -- |
| jsMinifier | ✅ | -- |
| jsMinifierOptions | ✅ | -- |
| cssMinifier | ✅ | -- |
| cssMinifierOptions | ✅ | -- |
| analyze | ✅ | -- |
| alias | ✅ | -- |
| define | ✅ | -- |
| sourceMap | ✅ | -- |
| externals | ❌ | -- |
| copy | ✅ | -- |
| svgr | ✅ | -- |
| svgrOptions | ✅ | -- |
| px2rem | ✅ | -- |
| useTailwindcss | ✅ | -- |
| tailwindcssOptions | ✅ | -- |

## Base Feature Support

- ✅ Code splitting
- ❌ Compatibility

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
  'react-dom',
  'react',
];
```

## customConfig

- 类型：`(config: ViteConfig) => ViteConfig`

当以上所有的配置都无法满足的时候，`customConfig`可以让你完全自定义vite配置。

`e.g.`

```ts
export default defineConfig((compileConfig) => {
  return {
    customConfig: (cfg) => {
      // do something
      
      // 一定要返回config
      return cfg;
    },
  };
});
```
