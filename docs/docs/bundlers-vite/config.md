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
| sever.port | ✅ | -- |
| outputPath | ❌ | -- |
| useLangJsonPicker | ❌ | -- |
| minimize | ❌ | -- |
| jsMinifier | ❌ | -- |
| jsMinifierOptions | ❌ | -- |
| cssMinifier | ❌ | -- |
| cssMinifierOptions | ❌ | -- |
| analyze | ❌ | -- |
| alias | ✅ | -- |
| define | ✅ | -- |
| sourceMap | ❌ | -- |
| externals | ❌ | -- |
| copy | ✅ | -- |
| svgr | ✅ | -- |
| svgrOptions | ✅ | -- |
| px2rem | ✅ | -- |
| useTailwindcss | ✅ | -- |
| tailwindcssOptions | ✅ | -- |

## customConfig

- 类型：`(config: WebpackConfig) => WebpackConfig`

当以上所有的配置都无法满足的时候，`customConfig`可以让你完全自定义webpack配置。

`e.g.`

```ts
export default defineConfig((runtimeCfg) => {
  return {
    customConfig: (cfg) => {
      // do something
      
      // 一定要返回config
      return cfg;
    },
  };
});
```
