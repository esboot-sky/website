---
sidebar_position: 3
title: Plugin Vue
---

# Plugin Vue

Vue 插件为 ESBoot 项目提供 Vue 3 开发支持。当前版本仅支持 `Vite`，并且 Vue 相关依赖与行为都收敛在 `@dz-web/esboot-plugin-vue` 内部；如果项目没有使用这个插件，ESBoot 主框架不会默认带入 Vue 相关打包插件。

## 支持范围

- 当前仅支持 `Vite`
- 暂不支持 `Webpack`
- 暂不支持 `Rspack`

如果你使用 `Webpack` 或 `Rspack`，`plugin-vue` 目前不能工作。

## 安装

安装 `@dz-web/esboot-plugin-vue` 后，插件会自带以下 Vue 相关依赖，无需再单独安装：

- [@vitejs/plugin-vue](https://github.com/vitejs/vite-plugin-vue) - Vue 3 单文件组件支持
- [@vitejs/plugin-vue-jsx](https://github.com/vitejs/vite-plugin-vue/tree/main/packages/plugin-vue-jsx) - Vue 3 JSX 支持
- [vite-plugin-vue-devtools](https://devtools.vuejs.org/guide/vite-plugin) - Vue DevTools 开发工具

## 配置

在 `.esbootrc.ts` 中引入并配置插件：

```ts
import { defineConfig } from '@dz-web/esboot';
import vuePlugin from '@dz-web/esboot-plugin-vue';

export default defineConfig({
  bundler: 'vite',
  plugins: [vuePlugin()],
});
```

## 配置选项

### vueDevToolsOptions

**类型**：`VitePluginVueDevToolsOptions & { enable?: boolean }`

**默认值**：`{ enable: true }`

Vue DevTools 插件配置选项。默认情况下，Vue DevTools 会在开发环境中自动启用。

```ts
import { defineConfig } from '@dz-web/esboot';
import vuePlugin from '@dz-web/esboot-plugin-vue';

export default defineConfig({
  plugins: [
    vuePlugin({
      vueDevToolsOptions: {
        enable: true,
        componentInspector: true,
        launchEditor: 'code',
      },
    }),
  ],
});
```

#### vueDevToolsOptions.enable

**类型**：`boolean`

**默认值**：`true`

是否启用 Vue DevTools。设置为 `false` 可以禁用 Vue DevTools。

#### componentInspector

**类型**：`boolean | VitePluginInspectorOptions`

**默认值**：`true`

是否启用 Vue 组件检查器。组件检查器允许你在浏览器中直接点击页面元素来定位对应的 Vue 组件代码。

#### launchEditor

**类型**：`'appcode' | 'atom' | 'atom-beta' | 'brackets' | 'clion' | 'code' | 'code-insiders' | 'codium' | 'emacs' | 'idea' | 'notepad++' | 'pycharm' | 'phpstorm' | 'rubymine' | 'sublime' | 'vim' | 'visualstudio' | 'webstorm' | 'rider' | string`

**默认值**：`'code'`

在编辑器中打开文件时使用的编辑器类型。默认为 Visual Studio Code。

更多选项请参考 [Vue DevTools 文档](https://devtools.vuejs.org/guide/vite-plugin#options)。

### jsxOptions

**类型**：`VueJsxOptions & { enable?: boolean }`

**默认值**：`{ enable: false }`

Vue JSX 插件配置选项。默认情况下，JSX 支持是禁用的。如果你需要在 Vue 组件中使用 JSX 语法，需要显式启用。

```ts
import { defineConfig } from '@dz-web/esboot';
import vuePlugin from '@dz-web/esboot-plugin-vue';

export default defineConfig({
  plugins: [
    vuePlugin({
      jsxOptions: {
        enable: true,
      },
    }),
  ],
});
```

#### jsxOptions.enable

**类型**：`boolean`

**默认值**：`false`

是否启用 Vue JSX 支持。设置为 `true` 后，你可以在 Vue 组件中使用 JSX 语法。

更多选项请参考 [@vitejs/plugin-vue-jsx 文档](https://github.com/vitejs/vite-plugin-vue/tree/main/packages/plugin-vue-jsx)。

## 使用

### Vue DevTools

当 `vueDevToolsOptions.enable` 为 `true`（默认值）时，Vue DevTools 会在开发环境中自动启用。你可以在浏览器中打开开发者工具，找到 Vue 标签页来使用 Vue DevTools 的功能。

Vue DevTools 提供了以下功能：

- 组件树查看：查看 Vue 组件的层级结构
- 组件状态检查：查看和修改组件的响应式数据
- 性能分析：分析组件的渲染性能
- 组件检查器：点击页面元素定位对应的组件代码

### Vue JSX

如果你启用了 JSX 支持，可以在 Vue 组件中使用 JSX 语法：

```tsx
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const count = ref(0);
    
    return () => (
      <div>
        <button onClick={() => count.value++}>
          Count: {count.value}
        </button>
      </div>
    );
  },
});
```

## 注意事项

### 仅支持 Vite

`plugin-vue` 目前只对 `Vite` 生效，请确保项目使用的是 Vite bundler：

```ts
import { defineConfig } from '@dz-web/esboot';
import vuePlugin from '@dz-web/esboot-plugin-vue';

export default defineConfig({
  bundler: 'vite',
  plugins: [vuePlugin()],
});
```

Vue 相关的 Vite 插件列表、framework chunk 处理以及 React `styleName` 的关闭行为，都会由 `plugin-vue` 自己接管，不需要手动再做额外过滤配置。

## 使用示例

### 基础配置

最简单的配置方式，使用所有默认选项：

```ts
import { defineConfig } from '@dz-web/esboot';
import vuePlugin from '@dz-web/esboot-plugin-vue';

export default defineConfig({
  bundler: 'vite',
  plugins: [vuePlugin()],
});
```

### 禁用 Vue DevTools

如果不需要 Vue DevTools，可以禁用它：

```ts
import { defineConfig } from '@dz-web/esboot';
import vuePlugin from '@dz-web/esboot-plugin-vue';

export default defineConfig({
  bundler: 'vite',
  plugins: [
    vuePlugin({
      vueDevToolsOptions: {
        enable: false,
      },
    }),
  ],
});
```

### 启用 JSX 支持

如果需要使用 JSX 语法：

```ts
import { defineConfig } from '@dz-web/esboot';
import vuePlugin from '@dz-web/esboot-plugin-vue';

export default defineConfig({
  bundler: 'vite',
  plugins: [
    vuePlugin({
      jsxOptions: {
        enable: true,
      },
    }),
  ],
});
```

### 完整配置示例

包含所有配置选项的完整示例：

```ts
import { defineConfig } from '@dz-web/esboot';
import vuePlugin from '@dz-web/esboot-plugin-vue';

export default defineConfig({
  bundler: 'vite',
  plugins: [
    vuePlugin({
      vueDevToolsOptions: {
        enable: true,
        componentInspector: true,
        launchEditor: 'code',
      },
      jsxOptions: {
        enable: true,
      },
    }),
  ],
});
```
