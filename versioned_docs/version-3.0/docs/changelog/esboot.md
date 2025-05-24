---
sidebar_position: 2
---

🎨

# ESBoot

## v3.0.39

### ESBoot

- fix: support useLangJsonPicker when isSP

## v3.0.38

### ESBoot

- chore(esboot): eslint alias change to abs path

### Bundler-webpack

- fix: enable langjsonpick in dev mode

### Bundler-vite

- chore: remove entry log

## v3.0.36

### Bundler-Vite

- fix(bundle-vite): entry path compatible windows

## v3.0.32

### Bundler-Vite

- feat: when config.js not exist, not copy and import
- fix: WebSocket server error: Port is already in use

## v3.0.28

### ESBoot

- feat: page metaData support `urlParams`。

### Plugin-Vitest

- fix: vitest cmd not work

### Bundler-Vite

- feat: support analyze。
- feat: support langjsonpicker。
- perf: `fs.readFile` instead of `fs.readFileSync`。

## v3.0.22~v3.0.27

### Bundler-Vite

- feat: support code-splitting
- fix: 修复vite不能导入css文件

## v3.0.21

### Bundler-vite

- fix: fix `static` not work in windows.
- fix: server.proxy not work.

## v3.0.19

### VSCode Plugin

- feat: enhance prepare command by adding IntelliSense support for common class utilities (`cn`, `cls`, `cva`, `clsx`, `classnames`) in the Tailwind CSS IntelliSense extension

### Bundler-vite

- feat: support `define`.
- feat: support static file copy
- feat: support `svgr`
- feat: support `svgrOptions`
- feat: support `useTailwindcss`
- feat: support `tailwindcssOptions`
- feat: support `server.proxy`
- feat: support `server.open`
- feat: support `px2rem`

### Bundler-webpack

- perf: extract `addPostcssPluginPx2rem`

### Lint

- chore: eslint include `.esbootrc.ts`

## v3.0.17

`241212`

- 🚀 test: add some unit test
- 🐞 fix: upgrade `prettier-plugin-classnames` to fix issues(not respecting maxLength)
- 🚀 chore(bundler-webpack): add template params(isDev)

## v3.0.16

`241203`

- ⚡ feat: improve prepare command when CI。

## v3.0.15

`241128`

- 🚀 add [`ESBOOT_CONTENT_IGNORE`](../guides/environment-variables#esboot_content_ignore) env, for ignore specific content。
- 🔥 chore: replace `webpackbarPlugin` with custom process bar。

## v3.0.11 ~ v3.0.12

`241125`

- 🚀 add `legacy` config, for legacy project。
- 🚀 for more type strict, tsconfig rules upgrade。
  - `noImplicitAny` -> disable implicit any
  - `strictNullChecks` -> enable strict null checks
- 🐞 config.js not compressed
- 🐞 修复windows上husky无法安装的问题。

## v3.0.8 ~ v3.0.10

`241116`

### ESBoot

- ⚡ perf: 优化`prepare`命令速度，将所有同步写入改为异步写入。
- 🚀 feat: `prepare`命令增加`updateVscodeSetting`步骤，更新`.vscode`的setting.json。以支持自动配置`tailwindcss intellisense`插件的`config file`。

### Lint

- 🔥 chore: `stylintrc` 更新`selector-max-id`规则。只支持一个且必须是`#root`。

## v3.0.5 ~ 3.0.7

`241029`

### ESBoot

- 🐞 fix: 添加`writeMultiPlatform`。

### Bundler Vite

- 🐞 fix: `plugin-vitest`使用`Bundler-vite`的时候找不到`styleName`的引入函数。
- ⚡ perf: 优化解析`styleName`的性能。

### Bundler Webpack

- 🐞 fix: Change `resolve.mainFields`, add `browser`。

## v3.0.2 ~ 3.0.4

`241016`

### ESBoot

- 🐞 fix: 修复`mock:bridge`命令，在windows下无法运行的问题。
- 🐞 fix: 修复`esboot mock:bridge`命令地址生成问题。

### Bundler Webpack

- 🐞 fix: 修复antd tree shaking失效的问题。
- 🐞 fix: 在dev模式下禁掉langjsonpick，避免热更新失败，参考[Refresh not working on entries using a layer](https://github.com/pmmmwh/react-refresh-webpack-plugin/issues/867)
