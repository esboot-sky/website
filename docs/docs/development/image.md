---
sidebar_position: 3
title: Image
description: Image development for ESBoot.
---

ESBoot支持多种常见图片资源，包括：

- `png`
- `jpg`
- `gif`
- `svg`
- `webp`

使用方式也很简单：

```tsx
import logo from './assets/logo.png';

<img src={logo} alt="logo" />
```

## 打包优化