---
sidebar_position: 1
---

# Style

样式相关的一些工具函数和库的再导出。

## Helpers

### cn

是一个`clsx`和`twMerge`的组合，参考[“cn” utility function in shadcn-ui/ui](https://dev.to/ramunarasinga/cn-utility-function-in-shadcn-uiui-3c4k)。

假设我们有一个组件，它的样式会根据其 isActive 和 hasError 属性变化。我们可以使用 cn 函数来动态生成类名，同时合并可能冲突的 Tailwind CSS 类。

```ts
import { cn } from '@dz-web/esboot-browser';

const buttonStyle = cn(
  'px-4 py-2 rounded', // 基础样式
  'text-white bg-blue-500 hover:bg-blue-600', // 正常状态下的样式
  { 'bg-red-500 hover:bg-red-600': hasError }, // 错误状态下的样式
  { 'ring-2 ring-blue-300': isActive } // 激活状态下的样式
);
```

## Libs

### cva

参考[cva](https://cva.style/docs)。

假设我们有一个按钮组件，它有几种不同的样式变体，如大小（小、中、大）和颜色（主色、次要色）。以下是如何使用 cva 来定义这些样式：

```ts
import { cva } from '@dz-web/esboot-browser';

const button = cva('px-4 py-2 rounded text-white', {
  variants: {
    size: {
      small: 'text-xs',
      medium: 'text-sm',
      large: 'text-lg',
    },
    color: {
      primary: 'bg-blue-500 hover:bg-blue-600',
      secondary: 'bg-gray-500 hover:bg-gray-600',
    }
  },
  defaultVariants: {
    size: 'medium',
    color: 'primary',
  }
});

// 使用示例
<button className={button({ size: 'large', color: 'secondary' })}>
  Click me
</button>
```

### clsx

- 导出[clsx](https://github.com/lukeed/clsx)。

```ts
import { clsx } from '@dz-web/esboot-browser';

clsx('foo', false && 'bar', 'baz'); // 'foo baz'
```

### twMerge

- 导出[twMerge](https://www.npmjs.com/package/tailwind-merge)。

```ts
import { twMerge } from '@dz-web/esboot-browser';

twMerge('text-red-500', 'text-blue-500', 'text-green-500'); // text-green-500
```
