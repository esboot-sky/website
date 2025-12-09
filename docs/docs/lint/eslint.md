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

## 配置定制化

`createConfig` 函数支持丰富的配置选项，允许你根据项目需求定制 ESLint 规则。所有配置项都支持深度合并，外部配置会合并到默认配置中。

### 配置选项类型定义

```typescript
interface Options {
  // 基础选项
  react?: boolean;                    // 是否启用 React 支持，默认 true
  vue?: boolean;                      // 是否启用 Vue 支持，默认 false
  
  // 基础 antfu 配置（覆盖第一个参数）
  base?: AntfuOptions;                // antfu 配置选项
  
  // 文件类型特定配置
  vueConfig?: Partial<FlatConfigItem>; // Vue 文件配置（**/*.{vue}）
  reactConfig?: Partial<FlatConfigItem>; // React/JSX/TS/TSX 文件配置（**/*.{jsx,ts,tsx}）
  
  // 全局配置
  settings?: Record<string, unknown>; // ESLint settings 配置
  globalRules?: Record<string, unknown>; // 全局规则配置
  
  // 扩展配置
  extends?: AntfuConfigItem[];       // 额外的 flat config 对象数组
}

interface FlatConfigItem {
  files?: string | string[];          // 匹配的文件模式
  plugins?: Record<string, unknown>;  // 插件配置
  rules?: Record<string, unknown>;    // 规则配置
  settings?: Record<string, unknown>; // 设置配置
  [key: string]: unknown;             // 其他配置项
}
```

### 基础配置示例

#### 1. 启用 Vue 支持

```js
import { createConfig } from '@dz-web/esboot/eslint';

export default createConfig({
  vue: true,
  react: false,
});
```

#### 2. 自定义基础配置

```js
import { createConfig } from '@dz-web/esboot/eslint';

export default createConfig({
  base: {
    typescript: true,
    stylistic: {
      semi: false,                    // 不使用分号
      quotes: 'double',               // 使用双引号
      indent: 4,                      // 4 空格缩进
      overrides: {
        'style/max-len': ['error', { code: 100 }], // 最大行长度 100
      },
    },
    ignores: [
      '**/node_modules/**',
      '**/dist/**',
      '**/custom-ignore/**',         // 添加自定义忽略目录
    ],
  },
});
```

### 文件类型特定配置

#### Vue 文件配置

```js
import { createConfig } from '@dz-web/esboot/eslint';

export default createConfig({
  vueConfig: {
    rules: {
      'better-tailwindcss/no-unregistered-classes': 'warn', // 改为警告
      'vue/multi-word-component-names': 'off',              // 关闭多词组件名检查
    },
    plugins: {
      // 可以添加额外的插件
      'custom-plugin': customPlugin,
    },
  },
});
```

#### React/TypeScript 文件配置

```js
import { createConfig } from '@dz-web/esboot/eslint';

export default createConfig({
  reactConfig: {
    rules: {
      // 覆盖 React 相关规则
      'react/no-missing-component-display-name': 'warn',     // 改为警告
      'react/no-missing-context-display-name': 'off',       // 关闭检查
      
      // 添加自定义规则
      '@typescript-eslint/no-explicit-any': 'warn',         // 允许 any，但警告
      '@typescript-eslint/explicit-function-return-type': 'off', // 关闭显式返回类型
    },
    plugins: {
      // 添加额外的 React 插件
      'react-perf': reactPerfPlugin,
    },
  },
});
```

#### 文件匹配模式

```js
import { createConfig } from '@dz-web/esboot/eslint';

export default createConfig({
  reactConfig: {
    files: ['**/*.{jsx,ts,tsx}', '**/*.test.{jsx,ts,tsx}'], // 包含测试文件
  },
  vueConfig: {
    files: ['**/*.{vue}', '**/*.vue'], // 自定义 Vue 文件匹配
  },
});
```

### 全局规则配置

#### 1. 修改全局规则

```js
import { createConfig } from '@dz-web/esboot/eslint';

export default createConfig({
  globalRules: {
    'no-console': 'warn',              // 允许 console，但警告
    'no-debugger': 'error',            // debugger 报错
    'no-unused-vars': 'off',           // 关闭未使用变量检查（TypeScript 有自己的检查）
  },
});
```

#### 2. 针对特定文件类型的全局规则

```js
import { createConfig } from '@dz-web/esboot/eslint';

export default createConfig({
  globalRules: {
    'no-console': ['warn', { allow: ['warn', 'error'] }], // 只允许 warn 和 error
  },
});
```

### Settings 配置

#### 1. 自定义 Tailwind CSS 配置

```js
import { createConfig } from '@dz-web/esboot/eslint';

export default createConfig({
  settings: {
    'better-tailwindcss': {
      variables: ['.*cls', '.*cn', '.*className'], // 添加更多变量名模式
      entryPoint: 'src/styles/tailwind.scss',      // 自定义入口文件
    },
  },
});
```

#### 2. 添加其他插件的 Settings

```js
import { createConfig } from '@dz-web/esboot/eslint';

export default createConfig({
  settings: {
    'better-tailwindcss': {
      variables: ['.*cls'],
      entryPoint: 'src/styles/index.scss',
    },
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true,
      },
    },
  },
});
```

### 扩展配置（extends）

`extends` 选项允许你添加额外的 flat config 对象，这些配置会被追加到配置数组的末尾，优先级最高。

#### 1. 添加测试文件特定规则

```js
import { createConfig } from '@dz-web/esboot/eslint';

export default createConfig({
  extends: [
    {
      files: ['**/*.test.{js,jsx,ts,tsx}', '**/*.spec.{js,jsx,ts,tsx}'],
      rules: {
        'no-console': 'off',           // 测试文件中允许 console
        '@typescript-eslint/no-explicit-any': 'off', // 测试文件中允许 any
      },
    },
  ],
});
```

#### 2. 添加配置文件特定规则

```js
import { createConfig } from '@dz-web/esboot/eslint';

export default createConfig({
  extends: [
    {
      files: ['*.config.{js,mjs,ts}', '*.config.*.{js,mjs,ts}'],
      rules: {
        'no-console': 'off',
        '@typescript-eslint/no-var-requires': 'off', // 允许 require
      },
    },
    {
      files: ['vite.config.ts', 'webpack.config.ts'],
      rules: {
        'import/no-default-export': 'off', // 允许默认导出
      },
    },
  ],
});
```

#### 3. 添加多个扩展配置

```js
import { createConfig } from '@dz-web/esboot/eslint';

export default createConfig({
  extends: [
    // 测试文件配置
    {
      files: ['**/*.test.{js,jsx,ts,tsx}'],
      rules: {
        'no-console': 'off',
      },
    },
    // 配置文件配置
    {
      files: ['*.config.{js,mjs,ts}'],
      rules: {
        '@typescript-eslint/no-var-requires': 'off',
      },
    },
    // 工具脚本配置
    {
      files: ['scripts/**/*.{js,ts}'],
      rules: {
        'no-console': 'off',
        'import/no-extraneous-dependencies': 'off',
      },
    },
  ],
});
```

### 配置合并规则

所有配置都使用**深度合并**策略：

1. **对象合并**：对于 `rules`、`plugins`、`settings` 等对象类型配置，会进行深度合并
2. **数组替换**：对于 `files`、`ignores` 等数组类型配置，如果外部提供了值，则替换默认值
3. **优先级**：外部配置优先级高于默认配置
4. **extends 优先级**：`extends` 数组中的配置会被追加到配置数组末尾，优先级最高

#### 合并示例

```js
// 默认配置
{
  rules: {
    'no-console': 'off',
    'no-debugger': 'error',
  }
}

// 外部配置
{
  globalRules: {
    'no-console': 'warn',  // 会覆盖 'off'
    'no-alert': 'error',   // 会新增
  }
}

// 最终结果
{
  rules: {
    'no-console': 'warn',  // 被覆盖
    'no-debugger': 'error', // 保留
    'no-alert': 'error',   // 新增
  }
}
```

### 常见场景

#### 设置跨平台库导入规则

```js
import { createConfig } from '@dz-web/esboot/eslint';

export default createConfig({
  reactConfig: {
    rules: {
      '@dz-web/esboot/no-cross-platform-lib-imports': ['error', ['rsuite'], ['antd-mobile']],
    },
  },
});
```

#### 允许测试文件使用 console

```js
import { createConfig } from '@dz-web/esboot/eslint';

export default createConfig({
  extends: [
    {
      files: ['**/*.test.{js,jsx,ts,tsx}'],
      rules: {
        'no-console': 'off',
      },
    },
  ],
});
```

#### 自定义文件匹配

```js
import { createConfig } from '@dz-web/esboot/eslint';

export default createConfig({
  reactConfig: {
    files: ['**/*.{js,jsx,ts,tsx}', '**/*.tsx'], // 包含 .tsx
  },
  vueConfig: {
    files: ['**/*.vue', '**/*.vuex'], // 包含 .vuex
  },
});
```

### 类型提示

`createConfig` 函数提供完整的类型提示：

```typescript
import { createConfig } from '@dz-web/esboot/eslint';
import type { FlatConfigItem } from '@antfu/eslint-config';

const config: FlatConfigItem = {
  files: ['**/*.test.ts'],
  rules: {
    'no-console': 'off',
  },
};

export default createConfig({
  extends: [config],
});
```
