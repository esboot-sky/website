---
sidebar_position: 2
---

# ESBoot

## v3.0.5

`~`

### ESBoot

- 🐞 fix: 添加`writeMultiPlatform`。

### Bundler Vite

- 🐞 fix: `plugin-vitest`使用`Bundler-vite`的时候找不到`styleName`的引入函数。
- ⚡ perf: 优化解析`styleName`的性能。

## V 3.0.2 ~ 3.0.4

`241016`

### ESBoot

- 🐞 fix: 修复`mock:bridge`命令，在windows下无法运行的问题。
- 🐞 fix: 修复`esboot mock:bridge`命令地址生成问题。

### Bundler Webpack

- 🐞 fix: 修复antd tree shaking失效的问题。
- 🐞 fix: 在dev模式下禁掉langjsonpick，避免热更新失败，参考[Refresh not working on entries using a layer](https://github.com/pmmmwh/react-refresh-webpack-plugin/issues/867)
