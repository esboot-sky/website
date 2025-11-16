---
slug: esboot-4
title: ESBoot 4
authors: [Roc]
tags: [Release]
date: 2025-05-24
---

Release ESBoot 4 note!

<!-- truncate -->

## 更新了什么

- All In ESM。
- Tailwindcss 4。
- 适配pnpm 10+。
- 适配eslint 扁平配置，更新eslint配置。
- 更新stylelint配置，增加`esboot-stylelint-config`包。
- 增强`esboot-browser`，支持更多浏览器端工具。
- 添加`esboot-browser-react`，用与浏览器端react项目的支持。
- 使用插件支持`vue`。
- 拥抱`React Compiler`。
- 修复一些bug。
- 基于过去一年的开发，优化template代码。
- 优化website UI。
- 更新所有依赖。

## Tailwindcss 4.0

内容的Tailwindcss升级到了[4.1](https://tailwindcss.com/blog/tailwindcss-v4)

### Breaking Changes

- 配置文件修改
- 入口文件修改

#### changes from v3

参考[changes from v3](https://tailwindcss.com/docs/upgrade-guide#changes-from-v3)

- 移除了`@apply`
- 移除了`@config`
- 移除了`@variants`
- 移除了`@responsive`
- 移除了`@screen`
- 移除了`@variants`

## ESLint

## Config

- 移除了`tailwindcssOptions`
