---
sidebar_position: 6
---

# Rspack Bundler

[Rspack](https://rspack.dev/) bundler的特定配置。

Rspack 是一个基于 Rust 的高性能构建工具，由 字节团队开发，旨在提供更快的构建速度。Rspack 与 Webpack 配置高度兼容，可以无缝迁移。

## Base Config Support

| Name               | Supported | Description                                                                 |
| ------------------ | --------- | --------------------------------------------------------------------------- |
| server.proxy       | ❌         | 暂不支持                                                                     |
| server.https       | ❌         | 暂不支持                                                                     |
| server.http2       | ❌         | 暂不支持                                                                     |
| server.open        | ❌         | 暂不支持                                                                     |
| server.port        | ❌         | 暂不支持                                                                     |
| outputPath         | ❌         | 暂不支持                                                                     |
| publicPath         | ❌         | 暂不支持                                                                     |
| useLangJsonPicker  | ❌         | 暂不支持                                                                     |
| minimize           | ❌         | 暂不支持                                                                     |
| jsMinifier         | ❌         | 暂不支持                                                                     |
| jsMinifierOptions  | ❌         | 暂不支持                                                                     |
| cssMinifier        | ❌         | 暂不支持                                                                     |
| cssMinifierOptions | ❌         | 暂不支持                                                                     |
| analyze            | ❌         | 暂不支持                                                                     |
| alias              | ❌         | 暂不支持                                                                     |
| define             | ❌         | 暂不支持                                                                     |
| sourceMap          | ❌         | 暂不支持                                                                     |
| externals          | ❌         | 暂不支持                                                                     |
| copy               | ❌         | 暂不支持                                                                     |
| svgr               | ❌         | 暂不支持                                                                     |
| svgrOptions        | ❌         | 暂不支持                                                                     |
| px2rem             | ❌         | 暂不支持                                                                     |
| useTailwindcss     | ❌         | 暂不支持                                                                     |

:::warning 开发中

Rspack bundler 目前正在开发中，大部分配置项暂未支持。如需使用完整功能，建议使用 Webpack 或 Vite bundler。

:::

## Base Feature Support

- ❌ Compatibility
- ❌ Code splitting

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

