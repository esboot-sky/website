---
sidebar_position: 3
---

# Config

对于 `ESBoot` 中能使用的自定义配置，你可以使用项目根目录的 `.esbootrc.ts`。

`ESBoot` 的配置文件是一个正常的 node 模块，它在执行 `ESBoot` 命令行的时候使用，并且不包含在浏览器端构建中。

## 配置文件示例

这里有一个最简单的 `ESBoot` 配置文件的范例：

```ts
import { defineConfig } from 'esboot';

export default defineConfig({
  outputPath: 'dist',
});
```

:::tip 关于 defineConfig

使用 `defineConfig` 包裹配置是为了在书写配置文件的时候，能得到更好的拼写联想支持。如果你不需要，直接 `export default {}` 也可以。

:::

## bundler

**类型**：`Bundler`

当前使用的 bundler，可选值为：

- [Webpack](./bundler-webpack)
- [Vite](./bundler-vite)
- [Rspack](./bundler-rspack)

## bundlerOptions

**类型**：`BundlerOptions`

基于你选择的 bundler 的配置项，具体参考各个 bundler 的文档。

## isSP

**类型**：`boolean`

**默认值**：`false`

是否是单平台模式。更多详情请参考[平台模式](./guides/platforms)。

## plugins

`since v2.8.0`

**类型**：`Plugin[]`

使用插件添加额外功能，接收一个[plugin](./plugins/dev)数组。

## server

开发服务器相关配置。

### proxy

**类型**：`object`

**默认值**：`{}`

配置代理功能，参考 [devServer.proxy](https://webpack.js.org/configuration/dev-server/#devserverproxy)。

**示例**：

```ts
proxy: {
  '/api': {
    target: 'http://jsonplaceholder.typicode.com/',
    changeOrigin: true,
    pathRewrite: { '^/api': '' },
  }
}
```

:::warning 注意事项

`proxy` 功能仅在 `dev` 模式下有效。

:::

### https

**类型**：`boolean`

**默认值**：`false`

与 [devServer.https](https://webpack.js.org/configuration/dev-server/#devserverhttps) 一致。

### http2

**类型**：`boolean`

**默认值**：`false`

与 [devServer.http2](https://webpack.js.org/configuration/dev-server/#devserverhttp2) 一致。

### open

**类型**：`boolean`

**默认值**：`false`

与 [devServer.open](https://webpack.js.org/configuration/dev-server/#devserveropen) 一致。

### port

**类型**：`number`

**默认值**：`8900`

与 [devServer.port](https://webpack.js.org/configuration/dev-server/#devserverport) 一致。

:::note 关于 Vite

如果使用 Vite bundler，`ESBoot` 会同时使用 `port` 和 `port + 1`。比如设置了 `8080`，那么会同时使用 `8080` 和 `8081`，所以如果多个项目记得至少隔 2。

:::

## outputPath

**类型**：`string`

**默认值**：`dist`

与 [output.path](https://webpack.js.org/configuration/output/#outputpath) 一致。

:::note 注意事项

执行 `esboot preview` 的时候也会默认使用这个路径。

:::

## useLangJsonPicker

**类型**：`boolean`

**默认值**：`true`

是否开启 pick 语言 json 文件字段。

如果开启，配合 [langJsonPicker](./development/entry-files#langjsonpicker) 字段使用，减少多语言文件体积。

:::warning 注意事项

因为 `useLangJsonPicker` 实现方式的特殊性，`mfsu` 的实现不支持 `entry` 是一个对象，导致和 `mfsu` 的 `entry` 冲突了，`dev` 模式下会失效，但是不影响 `prod` 模式。

:::

:::warning 文件路径限制

为了统一多语言文件，只会对 `src/lang/*.json` 文件生效。

:::

**示例**：

`en-US.json`

```json
{
  "global": {
    "project": "test project"
  },
  "test1": {
    "nest1": {
      "key1": "zh-cn-key1"
    },
    "nest2": {
      "key2": "zh-cn-key2"
    }
  }
}
```

`index.entry.tsx`

```tsx
import enUS from '@/lang/en-US.json';

// 此时 enUS 的内容就会去掉 `test1.nest1` 的内容
export default {
  langJsonPicker: ['global', 'test1.nest2'],
  title: 'index',
};
```

## minimize

**类型**：`boolean`

**默认值**：`true`

一键关闭 `js` 和 `css` 的压缩功能。

## jsMinifier

**类型**：`JsMinifier`

**默认值**：`JsMinifier.terser`

JavaScript 压缩工具选择。

```ts
enum JsMinifier {
  terser = 'terser',
  // esbuild = 'esbuild',
  swc = 'swc',
  none = 'none', // 不压缩
}
```

## jsMinifierOptions

**类型**：`object`

**默认值**：`{}`

`jsMinifier` 的配置项。默认情况下压缩代码会移除代码中的注释，可以通过对应的 `jsMinifier` 选项来保留注释。

**示例**：

```ts
{
  jsMinifier: 'terser',
  jsMinifierOptions: {
    format: {
      comments: false,
    },
  }
}
```

配置项需要和所使用的工具对应，具体参考对应文档：

- [terser](https://terser.org/docs/docs/3.0/api-reference/#minify-options)
- [swc](https://swc.rs/docs/docs/3.0/configuration/minification#configuration)

## cssMinifier

**类型**：`CSSMinifier`

**默认值**：`CSSMinifier.cssnano`

CSS 压缩工具选择。

```ts
export enum CSSMinifier {
  cssnano = 'cssnano',
  lightningcss = 'lightningcss',
  none = 'none', // 不压缩
}
```

## cssMinifierOptions

**类型**：`object`

**默认值**：`{}`

`cssMinifier` CSS 压缩工具配置选项。

**示例**：

```ts
{
  cssMinifier: 'lightningcss',
  cssMinifierOptions: {},
}
```

对应 CSS 压缩的配置请查看对应的文档：

- [cssnano](https://cssnano.co/docs/docs/3.0/config-file/)
- [lightningcss](https://lightningcss.dev/)

## analyze

**类型**：`boolean`

**默认值**：`false`

产物 size 分析，基于 [webpack-bundle-analyzer](https://www.npmjs.com/package/webpack-bundle-analyzer)。

默认开启 `8101` 端口，可以使用 `process.env.ANALYZE_PORT` 来修改端口。

:::tip 使用场景

开启 `analyze` 后，可以在构建时分析打包产物的大小，帮助优化打包体积。

:::

## alias

**类型**：`Record<string, string>`

**默认值**：

```js
{
  '@': 'src',
  '@mobile': 'src/platforms/mobile',
  '@mobile-native': 'src/platforms/mobile/_native',
  '@mobile-browser': 'src/platforms/mobile/_browser',
  '@pc': 'src/platforms/pc',
  '@pc-native': 'src/platforms/pc/_native',
  '@pc-browser': 'src/platforms/pc/_browser',
}
```

路径别名配置，使用方法如：

```tsx
import { FONT_SIZE } from '@/constants/config';
```

:::tip 配置注意事项

配置的 key，如 `@`，不要写成 `@/`，value 如 `src`，不要写成 `src/`，因为解析的时候会自动加上。

因为 `alias` 在项目中其实需要配置 4 个地方（`eslint`/`typescript`/`webpack`/`babel`），4 个地方的写法都有些不同，所以 `ESBoot` 内部会去兼容格式问题。

**生效时机**：

- `webpack` 和 `babel` 的改了 `alias` 会立即生效
- `typescript` 的会在执行 `esboot g-alias` 后生效
- `eslint` 只会在开项目的时候读一次配置，所以需要手动执行一次 `ESLint: Restart ESLint Server` 这个命令，推荐绑定这个操作为一个快捷键，这样可以快捷重启

也可以直接 `reload window`（`vscode` 中触发快捷键 `ctrl + shift + p`，然后输入 `reload window`）一下。这样 `alias` 也会完全生效。

:::

## define

**类型**：`Record<string, string>`

**默认值**：

- `process.env.VERSION`：项目版本
- `process.env.NODE_ENV`：环境变量
- `process.env.isMobile`：是否是移动端
- `process.env.isBrowser`：是否是浏览器
- `process.env.publicPath`

`webpack`中基于 [define-plugin](https://webpack.js.org/plugins/define-plugin/) 插件设置代码中的可用变量。

:::caution 注意事项

- 属性值会经过一次 `JSON.stringify` 转换
- key 值的替换是通过语法形式来匹配的，比如配置了 `{'a.b.c': 'abcValue'}` 是无法替换代码中的 `a.b?.c` 的

:::

**TypeScript 类型声明**：

当你在 ts 的项目中使用这些变量时，你需要在 `globals.d.ts` 文件中声明变量类型，以支持 ts 类型提示：

```ts
// define
declare const define: string;
```

## sourceMap

`since 2.10.0`

**类型**：`boolean`

**默认值**：`dev` 模式下为 `true`，`prod` 模式下 `false`

是否开启 `sourceMap`。

## externals

**类型**：`Externals`

参考 [webpack.externals](https://webpack.js.org/configuration/externals/)。

:::note 关于 Vite

如果使用 Vite bundler，`externals` 配置不支持。

:::

## copy

**类型**：`Array<string | { from: string; to: string; }>`

**默认值**：`[]`

配置要复制到输出目录的文件或文件夹。

:::tip 推荐做法

大部分情况可以不用，参考[静态文件](./development/static-files)配置方式。

:::

**字符串配置**：

当配置字符串时，默认拷贝到产物目录：

```ts
copy: ['foo.json', 'src/bar.json']
```

会产生如下产物的结构：

```plaintext
+ dist
  - bar.json
  - foo.json
+ src
  - bar.json
- foo.json
```

**对象配置**：

你也可以通过对象配置具体的拷贝位置，其中相对路径的起点为项目根目录：

```ts
copy: [
  { from: 'from', to: 'dist/output' },
  { from: 'file.json', to: 'dist' }
]
```

此时将产生如下产物结构：

```plaintext
+ dist
  + output
    - foo.json
  - file.json
+ from
  - foo.json
- file.json
```

## svgr

**类型**：`boolean`

**默认值**：`true`

是否开启 [svgr](https://react-svgr.com/docs/docs/3.0/webpack/)。

开启后可以这样使用 SVG：

```tsx
import svg from './assets/file.svg?url';
import Svg from './assets/file.svg';

const App = () => {
  return (
    <div>
      <img src={svg} width="200" height="200" />
      <Svg width="200" height="200" viewBox="0 0 3500 3500" />
    </div>
  );
};
```

## svgrOptions

**类型**：`SvgrOptions`

**默认值**：

```ts
{
  icon: true,
  typescript: true,
  ext: 'tsx',
}
```

参考 [svgrOptions](https://react-svgr.com/docs/docs/3.0/options/)。

## assetsInlineLimit

**类型**：`number`

**默认值**：`4096 (4 KiB)`

配置 asset 内联限制。

:::tip 使用场景

当 asset 大小小于这个值时，会内联到代码中，否则会生成一个文件。

:::

## pxtorem

**类型**：`PxtoremOptions`

**默认值**：

```js
{
  // 如果是 mobile 默认为 true
  enable: false,
  rootValue: 100,
  unitPrecision: 5,
  propWhiteList: [],
  propBlackList: [],
  exclude: false,
  selectorBlackList: [],
  ignoreIdentifier: false,
  replace: true,
  mediaQuery: false,
  minPixelValue: 0,
}
```

参考 [postcss-plugin-px2rem](https://www.npmjs.com/package/postcss-plugin-px2rem)。只不过内置的是基于 postcss 的插件。

:::note 关于 mobile 模式

如果是 mobile 模式，`enable` 默认为 `true`。

:::

## useTailwindcss

**类型**：`boolean`

**默认值**：`true`

是否使用 [tailwindcss](https://tailwindcss.com/)。
