---
sidebar_position: 3
title: Image
description: Image development for ESBoot.
---

## 支持的图片格式

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

:::tip 最佳实践
推荐使用`svg`，因为`svg`体积更小，加载更快。
:::

## SVGR

`ESBoot`内置了[SVGR](https://react-svgr.com/)，可以方便的将`svg`转换为`react`组件。

开启后可以这样使用：

```tsx
import svg from './assets/file.svg?url'; // 图片资源
import Svg from './assets/file.svg'; // 组件

const App = () => {
  return (
    <div>
      <img src={svg} width="200" height="200" />
      <Svg width="200" height="200" viewBox="0 0 3500 3500" />
    </div>
  );
}
```

## SVGO

`ESBoot`内置了[Svgo](https://github.com/svg/svgo)，可以方便的优化`svg`文件。你可以通过[svgrOptions](../config#svgroptions)字段来配置`Svgo`的配置。

```ts
export default {
  svgrOptions: {
    svgoConfig: {
      floatPrecision: 2, // 浮点精度
    },
  },
};
```

## 资源优化

你可以通过[assetsInlineLimit](../config#assetsinlinelimit)字段来配置资源内联限制。
