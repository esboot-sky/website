---
sidebar_position: 3
title: Webpack Admin to ESBoot V4
---

# Webpack Admin to ESBoot V4 Migration Guide

本指南基于 `pingan-admin` 项目的迁移实践，介绍了将基于 Webpack/Vite 的后台管理系统迁移到 ESBoot V4 架构的步骤。

## 1. 依赖调整 (package.json)

### 移除旧依赖

移除原有的构建工具（Vite/Webpack）、ESLint/Prettier 插件配置等。

### 添加 ESBoot 依赖

添加 ESBoot 核心库、打包器、插件以及类型声明。

```bash
# Dev Dependencies
pnpm add -D @dz-web/esboot @dz-web/esboot-bundler-vite \
  @dz-web/esboot-plugin-vitest @dz-web/esboot-plugin-vue \
  @types/node eslint stylelint

# Dependencies
pnpm add @dz-web/esboot-browser
```

### 更新 Scripts

将构建脚本替换为 `esboot` 命令，并添加 `postinstall` 钩子。

```json
{
  "scripts": {
    "dev": "esboot dev",
    "build": "esboot build",
    "preview": "esboot preview",
    "test:unit": "vitest",
    "type-check": "vue-tsc --build",
    "prepare": "esboot prepare",
    "postinstall": "esboot prepare"
  }
}
```

### 配置 Lint & Format

ESBoot 提供了开箱即用的 Lint 配置，无需单独维护 `.eslintrc.js` 等文件。

在 `package.json` 中配置：

```json
{
  "lint-staged": {
    "*.{js,jsx,ts,tsx}": "eslint",
    "*.{scss,css}": "stylelint"
  },
  "prettier": "./node_modules/.cache/esboot/prettier",
  "stylelint": {
    "extends": [
      "./node_modules/.cache/esboot/stylelint"
    ]
  }
}
```

同时，你需要删除项目根目录下原有的 lint 配置文件（如 `.eslintrc.js`, `.prettierrc.js`, `.stylelintrc.js` 等）。

## 2. 配置文件

### 创建 .esbootrc.ts

在项目根目录创建 ESBoot 配置文件。

```ts
import type { BundlerViteOptions as BundlerOptions } from '@dz-web/esboot-bundler-vite';
import { defineConfig, definePlugin, PluginHooks } from '@dz-web/esboot';
import { BundlerVite as Bundler } from '@dz-web/esboot-bundler-vite';
import pluginVitest from '@dz-web/esboot-plugin-vitest';
import pluginVue from '@dz-web/esboot-plugin-vue';

export default defineConfig<BundlerOptions>({
  plugins: [
    pluginVitest(),
    pluginVue({
      jsxOptions: {
        enable: true,
      },
    }),
  ],
  bundler: Bundler,
  isSP: true, // 单页应用模式
  server: {
    port: 4000,
  },
  alias: {
    '@@': 'src', // 配置额外的别名
  },
  bundlerOptions: {
    // 自定义 Vite 配置
    customConfig: (cfg) => {
      // 例如：自定义分包策略
      cfg.build.rollupOptions.output.manualChunks = (id) => {
        if (id.includes('node_modules')) {
          if (id.includes('element-plus')) return 'element-plus';
          if (id.includes('vue')) return 'vue-vendor';
          if (id.includes('lodash')) return 'lodash';
          return 'vendor';
        }
      };
      return cfg;
    },
  },
});
```

### 更新 tsconfig.json
简化 TypeScript 配置，直接继承 ESBoot 提供的最佳实践配置。

```json
{
  "extends": "./node_modules/.cache/esboot/typescript/tsconfig.json"
}
```

## 3. 目录结构与资源迁移

### 目录结构调整
ESBoot 规范了配置文件和静态资源的存放位置：

```plaintext
.
├── config
│   ├── config.js         # 全局配置文件（原 public/config.js）
│   ├── static            # 静态资源（原 public/* 移动到这里）
│   │   ├── favicon.ico
│   │   └── public-images
│   └── template
│       └── index.html    # HTML 模板（原 index.html）
├── src
│   └── index.entry.ts    # 入口文件（原 main.ts）
└── ...
```

1.  **HTML 模板**: 将根目录的 `index.html` 移动到 `config/template/index.html`。注意移除手动引入的 `<script src="/src/main.ts">`，ESBoot 会自动注入。
2.  **静态资源**: 将 `public` 目录下的所有内容移动到 `config/static/` 下。

### 静态资源路径处理
由于静态资源位置变更，需要更新获取资源路径的工具函数。

`src/utils/asset-path.ts`:

```ts
export function getAssetPath(relativePath: string): string {
  // 1. 使用 process.env.publicPath 替代 import.meta.env.VITE_PUBLIC_PATH
  const publicPath = process.env.publicPath || '/'
  const cleanPublicPath = publicPath.endsWith('/') ? publicPath : `${publicPath}/`
  const cleanRelativePath = relativePath.startsWith('/') ? relativePath.slice(1) : relativePath

  // 2. 增加 static/ 前缀
  return `${cleanPublicPath}static/${cleanRelativePath}`
}

export default getAssetPath
```

## 4. 入口文件改造

将 `src/main.ts` 重命名为 `src/index.entry.ts`。

ESBoot 架构下，入口文件需要导出生命周期钩子（即使是单页应用），以便更好地支持微前端或独立运行。

```ts
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './styles/main.scss'

let instance: any = null

function render(props: any = {}) {
  const { container } = props
  instance = createApp(App)
  instance.use(router)
  instance.use(store)
  instance.mount(container ? container.querySelector('#app') : '#app')
}

// 独立运行时直接渲染
if (!(window as any).__POWERED_BY_QIANKUN__) {
  render({})
}

// 导出生命周期钩子
export async function bootstrap() {
  console.log('bootstrap')
}

export async function mount(props: any) {
  render(props)
}

export async function unmount() {
  instance.unmount()
  instance = null
}

// 导出配置（可选）
export default {
  title: '应用标题',
}
```

## 5. 入口文件代码调整

### 移除 Webpack 特定代码

如果入口文件中存在 Webpack 特定的代码，需要移除：

```ts
// 移除以下代码
if (window.__POWERED_BY_QIANKUN__) {
  __webpack_public_path__ = window.__INJECTED_PUBLIC_PATH_BY_QIANKUN__
}
```

### 更新 PUBLIC_PATH 引用

如果项目使用 `window.APP_CONFIG.PUBLIC_PATH` 或其他全局配置，建议更新为兼容 ESBoot 的方式：

```ts
// 原代码
history = createWebHistory(
  window.__POWERED_BY_QIANKUN__ ? routerBase : window.APP_CONFIG.PUBLIC_PATH
)

// 更新为（兼容 ESBoot 和原有配置）
history = createWebHistory(
  window.__POWERED_BY_QIANKUN__ 
    ? routerBase 
    : (process.env.publicPath || window.APP_CONFIG?.PUBLIC_PATH || '/')
)
```

### HTML 模板调整

如果 HTML 模板使用了模板引擎语法（如 EJS），需要简化为纯 HTML：

```html
<!-- 移除模板语法 -->
<!-- <script src="<%= folder %>config.js?v=<%= version %>"></script> -->

<!-- 简化为 -->
<script src="./config.js"></script>
```

## 6. 清理旧文件

迁移完成后，需要删除以下不再需要的文件和目录：

1. **构建脚本目录**: 如果存在 `service/` 目录（包含自定义 Webpack 构建脚本），可以删除
2. **配置文件**: 删除 `.eslintrc.js`, `.prettierrc.js`, `.stylelintrc.js`, `.browserslistrc`, `babel.config.js` 等
3. **旧目录**: 删除空的 `public/` 目录（如果已迁移所有内容）

## 7. 其他注意事项

1.  **环境变量**: ESBoot 会自动处理环境变量，但尽量避免直接依赖 `import.meta.env` 中特定的构建工具变量。
2.  **Browserslist**: 建议在 `package.json` 中添加 `browserslist` 配置以控制构建目标。

```json
"browserslist": {
  "development": [
    "last 1 chrome version"
  ],
  "production": [
    "Chrome >= 100"
  ]
}
```

3.  **路由模式**: 如果项目使用 `createWebHistory`（History 模式），可以保持不变；如果使用 `createWebHashHistory`（Hash 模式），也无需修改。ESBoot 支持两种模式。
4.  **静态资源工具函数**: 如果项目中没有 `getAssetPath` 等工具函数，且需要动态获取静态资源路径，可以参考第 3 节创建相应的工具函数。
