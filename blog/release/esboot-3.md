---
slug: esboot-3
title: ESBoot 3
authors: [Roc]
tags: [Release]
date: 2024-09-18
---

Release ESBoot 3 note!

<!-- truncate -->

## 更新了什么

### 重构代码

- 更有扩展性的架构。
- 优化代码。
- 重构plugin机制。
- 添加更多feature。
- 根据v2经验移除部分过时feature。

### 支持多Bundler

- webpack的存档。
- vite占有率的提升。
- rust基建的兴起。

### 更新部分依赖到最新的稳定版本

一年一更新，锁死版本。

## 更合理的代码结构

### packages

```sh
.
├── bundler-common
├── bundler-rspack
├── bundler-vite
├── bundler-webpack
├── common
├── esboot
├── esboot-browser
├── eslint-plugin-esboot
├── lint
├── plugin-vitest
└── vscode-extension-esboot

12 directories.
```

### Bundlers

- `bundler-common`: Bundler通用工具
- `bundler-rspack`: Bundler Rspack
- `bundler-vite`: Bundler Vite
- `bundler-webpack`: Bundler Webpack

### ESBoot

- `common`: esboot通用工具
- `ESBoot`: 入口，注册cli，调用bundler
- `esboot-browser`: 浏览器端工具

### Lint

- `eslint-plugin-esboot`: eslint插件
- `lint`: lint相关

### Plugin

- `plugin-vitest`: vitest插件

### Other Tools

- `vscode-extension-esboot`: vscode插件

## Bundler

分析出一套常用的config，自定义配置使用`customConfig`。

### webpack

`100%`

- 实现v2的所有功能。
- 重新实现`langjsonpick`。
- 放弃`webpack-chain`。

### vite

`80%`

- 支持SPA
- 支持`styleName`
- 平滑支持webapck配置。

### rspack

- 开发10%

## 项目文档

- 基于v2 doc的使用设计为更简洁的doc设计。
- 更好看的主题。
- 添加changelog支持。

## ESBoot Browser

增加`esboot-browser`包，封装常用的浏览器端工具。

## ESBoot 文档更新

- 更合理的文档结构。
- 补充更多文档。
- 优先讲述ESBoot的立意。
- 添加最佳实践

## 依赖更新

只记录大版本更新。

### commander

- `Command 11.0.0 => 12.0.0`

[https://github.com/tj/commander.js/releases/tag/v12.0.0](https://github.com/tj/commander.js/releases/tag/v12.0.0)

### webpack-dev-server

`4 => 5`

修改了好多api，https，http这种。

### babel

- 移除[@babel/plugin-syntax-dynamic-import](https://babeljs.io/docs/babel-plugin-syntax-dynamic-import)

This plugin is included in @babel/preset-env, in ES2020。

- 移除[babel-plugin-transform-react-remove-prop-types](https://www.npmjs.com/package/babel-plugin-transform-react-remove-prop-types)

现在已经不用写prop type

### husky

最新是9，改成了`husky init`命令，但是发现升级也没有什么用处，就懒得升级了，还是用8.

但是有个新的更新，`.husky`目录放到了`config`目录下，根目录又会少一个文件。

## command

### prepare

`postinstall + g-alias` => `prepare`

- `prepare`就是去生成一些lint规则、ts规则这些/husky安装。
- `postinstall`有些语义不明。
- `g-alias`是刚开始设计不全，只考虑了生成`alias`后面发现需要准备的东西越来越多。

### exec_git_hooks

`commitlint / lint-staged` => `exec_git_hooks`

Git hooks的两个钩子命令更新。

- 封装的更内敛，更语义化。

### preview

- 使用`pnpx`启动，代替直接下载包。

## Config

### 移除环境变量`ESBOOT_PROJECT_TYPE`，增加`isSP`配置

之间用来区分是`SP`还是`MP`，现在在`.esbootrc`中添加`isSP`配置。

原因：尽量减少环境变量，没有类型声明，可读性也不好。

### 更新jsminifier/cssminifier

移除lightningcss/swc(build不需要那么快，反而下包要太久了)，固定用TerserPlugin和nano。(放弃webpack里使用rust，直接寻求vite或者rspack)。

- 去掉了rust包因为发现对打包的时间其实并不敏感，反而对下包的时间敏感，而且配置使用的不多。

### 移除ForkTsCheckerWebpackPlugin

- `ForkTsCheckerWebpackPlugin`因为激进的策略，所以几乎不会使用，所以实现后暂时移除。

### `customWebpack => customConfig`

现在有多个`bundler`，`customConfig`这个配置更抽象一些。

### 增加 `minimize`

用来控制是否压缩代码。

### 增加 `server` 配置

将`server`的配置独立出来，结构更清晰，包含`host`、`https`、`open`、`port`、`proxy`。

```ts
server?: {
  host?: string;
  https?: boolean;
  open?: boolean;
  port?: number;
  proxy?: Proxy[];
};
```

## 配置文件

### stylintconfig

- stylintconfig 地址修改，版本锁死

## 插件

### 重构插件机制

`240927`

更合理的架构设计，更具扩展性的API。

### 内置支持tailwindcss

`240810`

tailwindcss刚开始抽成插件是因为只是一个实验性的功能，经过多个项目的实验发现很好用，所以v3版本内置支持。

## 工具

### 添加vscode-extension-esboot

初步支持GUI操作环境变量，后续会添加更多功能(看情况)。

因为环境变量没有类型提示，但是某些情况很需要。但是现有的环境变量我都记不住，反正我记不住，特别是只想启动某些页面的时候。

## ESLint规则更新

### 增加规则，禁止引用非自己平台的代码

已经提前在`esboot v2`上实现了。

## 移除Hooks使用

之前使用的`afterHooks`是一个没有经过深思熟虑的设计，在`v3`中移除。完全使用`plugin`机制替代。例如v2经常使用的

```ts
export const afterHooks = (cfg) => {
  console.log(Object.entries(cfg._entry), '<-- cfg');
};
```

在v3中，可以完全使用`plugin`机制替代。

```ts
import { defineConfig, type Configuration, PluginHooks } from '@dz-web/esboot';

export default defineConfig({
  plugins: [
    {
      key: 'plugin-log',
      [PluginHooks.afterCompile]: (cfg) => {
        console.log(cfg.entry);
      },
    },
  ],
});
```

## 其他功能

- `build`优化，`CI`环境禁止使用缓存、也不使用`webpackbar`。

## 待完成功能

- [ ] ⭐️ 支持RSPack
- [ ] ⭐️ 支持changelogs
- [ ] ⭐️ 优化项目文档

### Feature

- [ ] 支持mock
- [ ] 支持多端同时开发
- [x] 扩展tailwind内置 cva和cn
- [ ] svgo配置

### Plugins

#### Vitest

- [ ] 测试覆盖率
- [ ] 多平台同步测试

### Bugs

- [ ] bug: tree-shaking失败
- [ ] bug: 物理缓存
- [ ] bug: mfsu-引入第三方css问题(antd-mobile的日期选择组件)

## 从v2迁移到v3

参考[迁移到v3](../../docs/3.0/docs/migration/migration-v3)
