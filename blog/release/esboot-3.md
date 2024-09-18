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

### 重构ESBoot

- 更有扩展性的架构。
- 优化代码。
- 重构plugin机制。
- 添加更多feature，移除部分过时feature。

### Bundler

- webpack的存档。
- vite占有率的提升。
- rust基建的兴起。

### 更新部分依赖到最新的稳定版本

一年一更新，锁死版本。

## 更合理的源码结构

### packages

```sh
.
├── bundler-common
├── bundler-rspack
├── bundler-vite
├── bundler-webpack
├── common
├── esboot
├── eslint-plugin-esboot
├── lint
├── plugin-vitest
└── vscode-extension-esboot

11 directories.
```

- `bundler-common`: Bundler通用工具
- `bundler-rspack`: Bundler Rspack
- `bundler-vite`: Bundler Vite
- `bundler-webpack`: Bundler Webpack

- `common`: esboot通用工具
- `esboot`: 入口，注册cli，调用bundler
- `eslint-plugin-esboot`: eslint插件
- `lint`: lint相关
- `plugin-vitest`: vitest插件
- `vscode-extension-esboot`: vscode插件

## Bundler

### webpack

- 实现了2的所有功能。

### vite

- 开发90%

### rspack

- 开发10%

## 文档更新

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

但是有个新的更新，`.husky`目录放到了`cacheDir`目录下，根目录又会少一个文件。

## command

### `postinstall + g-alias` => `prepare`

- `prepare`就是去生成一些lint规则、ts规则这些/husky安装。
- `postinstall`有些语义不明。
- `g-alias`是刚开始设计不全，只考虑了生成`alias`后面发现需要准备的东西越来越多。

### `commitlint / lint-staged` => `exec_git_hooks`

Git hooks的两个钩子命令更新。

- 封装的更内敛，更语义化。

### `preview`

- 使用`pnpx`启动，代替直接下载包。

## 配置更新

### 移除环境变量`ESBOOT_PROJECT_TYPE`，增加`isSP`配置

之间用来区分是`SP`还是`MP`，现在在`.esbootrc`中添加`isSP`配置。

原因：减少环境变量，没有类型声明，可读性也不好。

### 更新jsminifier/cssminifier

移除lightningcss/swc(build不需要那么快，反而下包要太久了)，固定用TerserPlugin和nano。(放弃webpack里使用rust，直接寻求vite或者rspack)。

- 去掉了rust包因为发现对打包的时间其实并不敏感，反而对下包的时间敏感，而且配置使用的不多。

### 移除ForkTsCheckerWebpackPlugin

#### `240806`

- `ForkTsCheckerWebpackPlugin`因为激进的策略，所以几乎不会使用，所以实现后暂时移除。 || 想了下还是要加下，现在就是因为有太多忽略的行为，导致代码有很多未使用的变量，现在写esboot就是用的这个策略，一点问题就不能编译很烦但是对代码质量有绝对提高。
- stylintconfig 地址修改，版本锁死

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

## 插件

## 重构插件机制

更合理的架构设计，优化性能。

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

## 其他优化

- `build`优化，`CI`环境禁止使用缓存、也不使用`webpackbar`。

## 从v2迁移到v3

## 后续更新计划

- 锁死依赖版本，半年更新一次。
- 一年一个大版本。
