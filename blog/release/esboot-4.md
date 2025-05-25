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

- [Tailwindcss 4.0](#tailwindcss-40)

## Tailwindcss 4.0

内容的Tailwindcss升级到了[4.1](https://tailwindcss.com/blog/tailwindcss-v4)

### Breaking Changes

#### 修改入口

根据[Simplified installation](https://tailwindcss.com/blog/tailwindcss-v4#simplified-installation)

```css
/* 旧 */ 
@tailwind base;
@tailwind components;
@tailwind utilities;
```

```css
/* 新 */
@import "tailwindcss";
```

#### changes from v3

参考[changes from v3](https://tailwindcss.com/docs/upgrade-guide#changes-from-v3)

- 移除了`@apply`
- 移除了`@config`
- 移除了`@variants`
- 移除了`@responsive`
- 移除了`@screen`
- 移除了`@variants`

## Config

- 移除了`tailwindcssOptions`
