---
sidebar_position: 2
title: ESLint
---

## 介绍

`ESBoot@4`基于`eslint@9`的Flat Config，并且内置了项目的最佳实践配置。在大部分情况下不需要再额外配置。

## 开始使用

在项目根目录创建`eslint.config.mjs`文件。

```js
import { createConfig } from '@dz-web/esboot/eslint';

export default createConfig();
```

即可使用`ESBoot`的eslint规则。

## 内置规则集

`ESBoot`内置了以下规则集：

- `tailwindcss`
- `react`
- `typescript`
- `typescript react`
- `stylistic`
- `jsonc`
- `vue`

## 内置规则

`@dz-web/esboot-lint`内置了`@dz-web/esboot-eslint-plugin`的规则，包含以下规则：

### no-cross-platform-imports

**规则说明：** 禁止跨平台导入代码，确保平台特定代码不会被其他平台误用。在 `MP` 模式下，不同平台的代码应该相互隔离，避免在 `mobile` 平台代码中导入 `pc` 平台的代码，或在 `_browser` 代码中导入 `_native` 的代码。

**适用场景：** 仅在 `MP`（Multi Platforms）模式下生效。

**平台目录结构：**

- `src/platforms/mobile/` - 移动端专用代码
- `src/platforms/pc/` - PC端专用代码
- `src/platforms/mobile/_browser/` - 移动端浏览器专用代码
- `src/platforms/mobile/_native/` - 移动端原生专用代码
- `src/platforms/pc/_browser/` - PC端浏览器专用代码
- `src/platforms/pc/_native/` - PC端原生专用代码

#### 正确示例 ✅

```ts
// src/platforms/mobile/components/Button.tsx
// ✅ 正确：从移动端共享目录导入
import { helper } from '@/helpers/utils';
import { Component } from '@/components/Base';

// ✅ 正确：从移动端平台目录导入
import { mobileHelper } from '@mobile/helpers/utils';

// ✅ 正确：从移动端浏览器目录导入（在移动端浏览器代码中）
import { browserHelper } from '@mobile-browser/helpers/utils';
```

```ts
// src/platforms/pc/components/Button.tsx
// ✅ 正确：从PC端平台目录导入
import { pcHelper } from '@pc/helpers/utils';

// ✅ 正确：从PC端浏览器目录导入（在PC端浏览器代码中）
import { browserHelper } from '@pc-browser/helpers/utils';
```

#### 错误示例 ❌

```ts
// src/platforms/mobile/components/Button.tsx
// ❌ 错误：移动端代码不能导入PC端代码
import { pcHelper } from '@pc/helpers/utils';

// ❌ 错误：移动端浏览器代码不能导入移动端原生代码
import { nativeHelper } from '@mobile-native/helpers/utils';
```

```ts
// src/platforms/pc/components/Button.tsx
// ❌ 错误：PC端代码不能导入移动端代码
import { mobileHelper } from '@mobile/helpers/utils';

// ❌ 错误：PC端浏览器代码不能导入PC端原生代码
import { nativeHelper } from '@pc-native/helpers/utils';
```

```ts
// src/platforms/mobile/_browser/components/Button.tsx
// ❌ 错误：移动端浏览器代码不能导入移动端原生代码
import { nativeHelper } from '@mobile-native/helpers/utils';

// ❌ 错误：移动端浏览器代码不能导入PC端代码
import { pcHelper } from '@pc/helpers/utils';
```

:::tip 代码组织原则

遵循**从通用到特定**的原则：

- **平台无关代码**：放在 `src/helpers/` 下，所有平台都可以使用
- **平台特定代码**：放在对应的 `src/platforms/{platform}/` 下
- **宿主环境特定代码**：放在对应的 `src/platforms/{platform}/_{env}/` 下

:::

### no-cross-platform-lib-imports

**规则说明：** 禁止跨平台导入特定的第三方库。在 `MP` 模式下，某些第三方库是平台特定的（如 PC 端使用 `rsuite`、`antd`，移动端使用 `antd-mobile`），规则会检查并禁止在错误的平台中导入这些库。

**适用场景：** 仅在 `MP`（Multi Platforms）模式下生效。

**配置方式：**

在 `eslint.config.mjs` 中配置：

```js
import { createConfig } from '@dz-web/esboot/eslint';

export default createConfig({
  rules: {
    '@dz-web/esboot/no-cross-platform-lib-imports': [
      'error',
      ['rsuite', 'antd'],      // PC 端使用的库列表
      ['antd-mobile']          // 移动端使用的库列表
    ]
  }
});
```

**配置说明：**

- 第一个数组：PC 端使用的库列表，移动端代码不能导入这些库
- 第二个数组：移动端使用的库列表，PC 端代码不能导入这些库

#### 第三方库导入正确示例 ✅

```ts
// src/platforms/pc/components/Button.tsx
// ✅ 正确：PC 端代码导入 PC 端库
import { Button } from 'rsuite';
import { Table } from 'antd';
```

```ts
// src/platforms/mobile/components/Button.tsx
// ✅ 正确：移动端代码导入移动端库
import { Button } from 'antd-mobile';
```

#### 第三方库导入错误示例 ❌

```ts
// src/platforms/mobile/components/Button.tsx
// ❌ 错误：移动端代码不能导入 PC 端库
import { Button } from 'rsuite';
import { Table } from 'antd';
```

```ts
// src/platforms/pc/components/Button.tsx
// ❌ 错误：PC 端代码不能导入移动端库
import { Button } from 'antd-mobile';
```

:::tip 使用建议

- 根据项目实际使用的 UI 库进行配置
- PC 端常用的库：`rsuite`、`antd`、`element-plus` 等
- 移动端常用的库：`antd-mobile`、`vant` 等
- 确保配置的库名与 `package.json` 中的依赖名称一致

:::

## 扩展规则
