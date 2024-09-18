---
sidebar_position: 3
---

# Config

对于`esboot`中能使用的自定义配置，你可以使用项目根目录的`.esbootrc.ts`。

`esboot`的配置文件是一个正常的 node 模块，它在执行`esboot`命令行的时候使用，并且不包含在浏览器端构建中。

这里有一个最简单的`esboot`配置文件的范例：

```ts
import { defineConfig } from 'esboot';
 
export default defineConfig({
  outputPath: 'dist',
});
```

使用 `defineConfig` 包裹配置是为了在书写配置文件的时候，能得到更好的拼写联想支持。如果你不需要，直接 `export default {}` 也可以。

## bundler

- 类型：`Bundler`

当前使用的 bundler，可选值为

- [Webpack](./bundlers-webpack/config)
- [Vite](./bundlers-vite/config)
- [Rspack](./bundlers-rspack/config)

## bundlerOptions

- 类型：`BundlerOptions` 基于你选择的 bundler 的配置项，具体参考各个 bundler 的文档。

## isSP

- 类型：`boolean`
- 默认值：`false`

是否是单平台模式。

## plugins

`since v2.8.0`

使用插件添加额外功能，接收一个[plugin](./plugins/dev)。

## server

### proxy

- 类型：`object`
- 默认值：`{}`

配置代理功能，参考[devServer.proxy](https://webpack.js.org/configuration/dev-server/#devserverproxy)。

比如，

```ts
proxy: {
  '/api': {
    'target': 'http://jsonplaceholder.typicode.com/',
    'changeOrigin': true,
    'pathRewrite': { '^/api' : '' },
  }
}
```

注意：`proxy` 功能仅在 `dev` 时有效。

### https

- 默认值：`false`

与[devServer.https](https://webpack.js.org/configuration/dev-server/#devserverhttps)一致。

### http2

- 默认值：`false`

与[devServer.http2](https://webpack.js.org/configuration/dev-server/#devserverhttp2)一致。

### open

- 默认值：`false`

与[devServer.open](https://webpack.js.org/configuration/dev-server/#devserveropen)一致。

### port

- 默认值：`8900`

与[devServer.port](https://webpack.js.org/configuration/dev-server/#devserverport)一致。

## outputPath

- 默认值：`dist`

与[output.path](https://webpack.js.org/configuration/output/#outputpath)一致。

注意：执行`esboot preview`的时候也会默认用这个路径。

## useLangJsonPicker

:::warning
因为`useLangJsonPicker`实现方式的特殊性，`mfsu`的实现不支持`entry`是一个对象，导致和`mfsu`的`entry`冲突了，`dev`模式下会失效，但是不影响`prod`模式。
:::

- 类型： `boolean`
- 默认值：`true`

是否开启pick语言json文件字段。

如果开启，配合[langJsonPicker](./guides/entry-files#langjsonpicker)字段使用，减少多语言文件体积。

参考下面示例：

*en-US.json*

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

*index.entry.tsx*

```tsx
import enUS from '@/lang/en-US.json';

// 此时enUS的内容就会去掉`test1.nest1`的内容。
export default {
  langJsonPicker: ['global', 'test1.nest2'],
  title: 'index',
};
```

:::warning
为了统一多语言文件，只会对`src/lang/*.json`文件生效。
:::

## minimize

## jsMinifier

- 类型：`JsMinifier`。

```ts
enum JsMinifier {
  terser = 'terser',
  // esbuild = 'esbuild',
  swc = 'swc',
  none = 'none', // 不压缩
}
```

- 默认值：`JsMinifier.terser`

## jsMinifierOptions

- 类型：`object`
- 默认值：`{}`

`jsMinifier` 的配置项；默认情况下压缩代码会移除代码中的注释，可以通过对应的 `jsMinifier` 选项来保留注释。

示例:

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

- 类型：`CSSMinifier`

```ts
export enum CSSMinifier {
  cssnano = 'cssnano',
  lightningcss = 'lightningcss',
  none = 'none', // 不压缩
}
```

- 默认值：`CSSMinifier.cssnano`

## cssMinifierOptions

- 类型： `Object`
- 默认值：`{}`

`cssMinifier` CSS 压缩工具配置选项。

示例：

```css
{
  cssMinifier: 'lightningcss',
  cssMinifierOptions: {},
}
```

对应 CSS 压缩的配置请查看对应的文档。

- [cssnano](https://cssnano.co/docs/docs/3.0/config-file/)
- [lightningcss](https://lightningcss.dev/)

## analyze

- 类型：`boolean`
- 默认值：`false`

产物size分析，基于[webpack-bundle-analyzer](https://www.npmjs.com/package/webpack-bundle-analyzer)。

默认开启`8101`端口，可以使用`process.env.ANALYZE_PORT`来修改端口。

## alias

- 类型：`Record<string, string>`
- 默认值：

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

:::tip

配置的key，如`@`，不要写成`@/`，value如`src`，不要写成`src/`，因为解析的时候会自动加上。

因为`alias`在项目中其实需要配置4个地方(`eslint`/`typescript`/`webpack`/`babel`)，4个地方的写法都有些不同，所以`esboot`内部会去兼容格式问题。

其中`webpack`和`babel`的改了`alias`会立即生效。

`typescript`的会在执行`esboot g-alias`后生效。

但是`eslint`只会在开项目的时候读一次配置，所以需要手动执行一次`ESLint: Restart ESLint Server`这个命令，推荐绑定这个操作为一个快捷键，这样可以快捷重启。

也可以直接`reload window`(`vscode`中触发快捷键`ctrl + shift + p`，然后输入`reload window`)一下。这样`alias`也会完全生效。
:::

## define

- 类型：`Record<string, string>`
- 默认值： 如下

```js
{
  'process.env.VERSION': JSON.stringify(version),
  'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
}
```

基于[define-plugin](https://webpack.js.org/plugins/define-plugin/) 插件设置代码中的可用变量。

:::caution

- 属性值会经过一次 `JSON.stringify` 转换。
- key 值的替换是通过语法形式来匹配的，比如配置了 `{'a.b.c': 'abcValue'}` 是无法替换代码中的 `a.b?.c` 的

:::

当你在 ts 的项目中使用这些变量时，你需要在 `globals.d.ts` 文件中声明变量类型，以支持 ts 类型提示，比如：

```js
// define
declare const define: string;
```

## sourceMap

`since 2.10.0`

- 类型：`boolean`
- 默认值：`dev`模式下为`true`，`prod`模式下`false`。

是否开启`sourceMap`。

## externals

参考[webpack.externals](https://webpack.js.org/configuration/externals/)

## copy

**大部分情况可以不用，参考[static](./guides/static-files)**

- 类型：`Array<string | { from: string; to: string; }>`
- 默认值：`[]`

配置要复制到输出目录的文件或文件夹。

当配置字符串时，默认拷贝到产物目录，如：

```ts
copy: ['foo.json', 'src/bar.json']
```

会产生如下产物的结构：

```txt
+ dist
  - bar.json
  - foo.json
+ src
  - bar.json
- foo.json
```

你也可以通过对象配置具体的拷贝位置，其中相对路径的起点为项目根目录：

```ts
copy: [
  { from: 'from', to: 'dist/output' },
  { from: 'file.json', to: 'dist' }
]
```

此时将产生如下产物结构：

```txt
+ dist
  + output
    - foo.json
  - file.json
+ from
  - foo.json
- file.json
```

## svgr

- 类型：`boolean`
- 默认值：`true`

开启[svgr](https://react-svgr.com/docs/docs/3.0/webpack/)之后可以写成

```tsx
import svg from './assets/file.svg?url'
import Svg from './assets/file.svg'

const App = () => {
  return (
    <div>
      <img src={svg} width="200" height="200" />
      <Svg width="200" height="200" viewBox="0 0 3500 3500" />
    </div>
  )
}
```

## svgrOptions

- 默认值: 

```ts
{
  icon: true,
  typescript: true,
  ext: 'tsx',
}
```

参考[svgrOptions](https://react-svgr.com/docs/docs/3.0/options/)

## pxtorem

- 默认值：

```js
{
  // 如果是mobile 默认为true
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

参考[postcss-plugin-px2rem](https://www.npmjs.com/package/postcss-plugin-px2rem)。只不过内置的是基于postcss的插件。

## useTailwindcss

- 类型：`boolean`
- 默认值：`true`

是否使用[tailwindcss](https://tailwindcss.com/)。

## tailwindcssOptions

- 类型：`(config: TailwindConfig) => TailwindConfig | TailwindConfig`
- 默认：

```ts
const defaultTailwindCSSOpts: Config = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [],
};
```

参考[tailwindcss](https://tailwindcss.com/docs/configuration)。
