---
sidebar_position: 2
---

🎨

# ESBoot

# v3.0.12

`241125`

- 🐞 修复windows上husky无法安装的问题。

# v3.0.11

`241125`

- 🚀 add `legacy` config, for legacy project。
- 🚀 for more type strict, tsconfig rules upgrade。
  - `noImplicitAny` -> disable implicit any
  - `strictNullChecks` -> enable strict null checks
- 🐞 config.js not compressed

# v3.0.8 ~ v3.0.10

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

## V 3.0.2 ~ 3.0.4

`241016`

### ESBoot

- 🐞 fix: 修复`mock:bridge`命令，在windows下无法运行的问题。
- 🐞 fix: 修复`esboot mock:bridge`命令地址生成问题。

### Bundler Webpack

- 🐞 fix: 修复antd tree shaking失效的问题。
- 🐞 fix: 在dev模式下禁掉langjsonpick，避免热更新失败，参考[Refresh not working on entries using a layer](https://github.com/pmmmwh/react-refresh-webpack-plugin/issues/867)
