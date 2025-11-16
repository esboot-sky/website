---
sidebar_position: 4
title: Browser
---

# Introduction

`@dz-web/esboot-browser` 是 `ESBoot` 的浏览器端工具集，提供了浏览器端常用的工具函数和方法。

## Installation

```sh
pnpm install @dz-web/esboot-browser
```

## AOP

### createExternalConsole

创建一个外部console，用于在非浏览器端打印日志。类似于vConsole。默认使用`eruda`。

:::tip

为什么要封装外部console？

主要是希望未来切换到其他console库时，不需要修改代码。且能够默认支持其他扩展功能或者定制化需求。
:::

```ts
interface CreateExternalConsoleOptions {
  enabled?: boolean;
  timeout?: number;
  resourceUrl?: string;
}

export function createExternalConsole(
  options?: CreateExternalConsoleOptions
): Promise<typeof window.eruda.init | false>;
```

#### 参数

- `options`：可选的配置对象。
  - `enabled`：是否启用外部console。默认为 `window?.GLOBAL_CONFIG?.debug ?? false`。
  - `timeout`：加载资源超时时间（毫秒）。默认为 `10000`（10秒）。
  - `resourceUrl`：外部console库的资源URL。默认为 `'https://cdn.jsdelivr.net/npm/eruda'`。

#### 返回值

返回一个 Promise，解析值为：

- `typeof window.eruda.init`：成功加载并初始化eruda时返回eruda的init方法。
- `false`：当 `enabled` 为 `false`、`resourceUrl` 为空、加载超时或加载失败时返回 `false`。

#### 示例

基本使用：

```ts
import { createExternalConsole } from '@dz-web/esboot-browser';

createExternalConsole();
```

自定义配置：

```ts
import { createExternalConsole } from '@dz-web/esboot-browser';

const eruda = await createExternalConsole({
  enabled: true,
  timeout: 5000,
  resourceUrl: 'https://cdn.jsdelivr.net/npm/eruda@3.0.0',
});

if (eruda) {
  console.log('External console initialized');
}
```

通过全局配置启用：

```ts
import { createExternalConsole } from '@dz-web/esboot-browser';

window.GLOBAL_CONFIG = {
  debug: true,
};

createExternalConsole();
```

## Utils

### flattenLangObject

将语言包扁平化，用于传递给react-intl的`messages`。

```ts
import { flattenLangObject } from '@dz-web/esboot-browser';

const langData = await import(`@/lang/${supportedLanguage.ZH_CN}.json`);
const flattenedLangData = flattenLangObject(langData.default);
```

比如把

```json
{
  "a": 1,
  "b": {
    "c": 2
  }
}
```

扁平化后变成：

```json
{
  "a": 1,
  "b.c": 2
}
```

## Constants

一些常用的常量。

```ts
import { userAgent, isIOS, isAndroid, isDZApp, isDZAppByDS } from '@dz-web/esboot-browser';

console.log(userAgent); // Mozilla/5.0 (iPhone; CPU iPhone OS 17_1_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.1.1 Mobile/15E148 Safari/604.1
console.log(isIOS); // true
console.log(isAndroid); // false
console.log(isDZApp); // false
console.log(isDZAppByDS); // false
```

- `userAgent`：浏览器用户代理字符串。
- `isIOS`：是否是iOS设备。
- `isAndroid`：是否是Android设备。
- `isDZApp`：是否是DZApp。
- `isDZAppByDS`：是否是DZ flutter app。

## Style Helpers

样式相关的一些工具函数和库的再导出。

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

## Style Libs

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
