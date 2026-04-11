---
sidebar_position: 3
title: Image
description: Image development for ESBoot.
---

## Supported Formats

ESBoot supports common image assets including:

- `png`
- `jpg`
- `gif`
- `svg`
- `webp`

```tsx
import logo from './assets/logo.png';

<img src={logo} alt="logo" />
```

:::tip Best Practice

Prefer `svg` whenever possible because it is usually smaller and scales better.

:::

## SVGR

ESBoot includes [SVGR](https://react-svgr.com/) so SVG files can be imported as React components.

```tsx
import svg from './assets/file.svg?url';
import Svg from './assets/file.svg';
```

## SVGO

ESBoot also includes [SVGO](https://github.com/svg/svgo). Configure it through [svgrOptions](../config#svgroptions).

## Asset Optimization

Use [assetsInlineLimit](../config#assetsinlinelimit) to control inlining behavior.
