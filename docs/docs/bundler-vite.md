---
sidebar_position: 5
---

# Vite Bundler

[vite](https://vitejs.dev/) bundler的特定配置。

## Base Config Support

| Name               | Supported | Description                                                                 |
| ------------------ | --------- | --------------------------------------------------------------------------- |
| server.proxy       | ✅         | 配置代理功能，参考 [Vite server.proxy](https://vitejs.dev/config/server-options.html#server-proxy) |
| server.https       | ❌         | 暂不支持                                                                     |
| server.http2       | ❌         | 暂不支持                                                                     |
| server.open        | ✅         | 与 [Vite server.open](https://vitejs.dev/config/server-options.html#server-open) 一致 |
| server.port        | ✅         | 与 [Vite server.port](https://vitejs.dev/config/server-options.html#server-port) 一致。注意：`ESBoot` 会同时使用 `port` 和 `port + 1`，比如设置了 `8080`，那么会同时使用 `8080` 和 `8081`，所以如果多个项目记得至少隔 2 |
| outputPath         | ✅         | 构建输出目录                                                                 |
| publicPath         | ✅         | 部署应用包时的基础 URL                                                       |
| useLangJsonPicker  | ✅         | 是否开启 pick 语言 json 文件字段，配合 `langJsonPicker` 字段使用 |
| minimize           | ✅         | 一键关闭 `js` 和 `css` 的压缩功能 |
| jsMinifier         | ✅         | JavaScript 压缩工具选择（terser/swc/none） |
| jsMinifierOptions  | ✅         | `jsMinifier` 的配置项 |
| cssMinifier        | ✅         | CSS 压缩工具选择（cssnano/lightningcss/none） |
| cssMinifierOptions | ✅         | `cssMinifier` 的配置项 |
| analyze            | ✅         | 产物 size 分析 |
| alias              | ✅         | 路径别名配置 |
| define             | ✅         | 定义全局常量替换 |
| sourceMap          | ✅         | 是否开启 sourceMap |
| externals          | ❌         | Vite bundler 不支持 externals 配置 |
| copy               | ✅         | 配置要复制到输出目录的文件或文件夹 |
| svgr               | ✅         | 是否开启 [svgr](https://react-svgr.com/) |
| svgrOptions        | ✅         | [svgrOptions](https://react-svgr.com/docs/options/) 配置 |
| assetsInlineLimit  | ✅         | 配置 asset 内联限制 |
| px2rem             | ✅         | px 转 rem 配置，参考 [postcss-plugin-px2rem](https://www.npmjs.com/package/postcss-plugin-px2rem) |
| useTailwindcss     | ✅         | 是否使用 [tailwindcss](https://tailwindcss.com/) |

## Base Feature Support

- ✅ Code splitting
- ❌ Compatibility

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
  'react-dom',
  'react',
];
```

## customConfig

- 类型：`(config: ViteConfig) => ViteConfig`

当以上所有的配置都无法满足的时候，`customConfig` 可以让你完全自定义 vite 配置。

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

