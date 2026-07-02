---
sidebar_position: 2
title: Built-in Plugins
---

# 内置插件

ESBoot 提供了一些开箱即用的内置插件，无需额外安装 npm 包，直接从 `@dz-web/esboot` 导入即可使用。

## entryLogPlugin

`entryLogPlugin` 用于在编译/打包完成后，在控制台打印当前项目所解析到的所有页面入口（Entry）的详细信息，包含页面数量、平台、页面类型、入口文件路径、HTML 模板路径以及页面标题等。

它在多平台（Multi-Platform）或多页面（Multi-Page）的项目中非常实用，能够清晰地展示当前编译激活了哪些页面。

### 使用方法

在 `.esbootrc.ts` 中直接导入并注册：

```ts
import { defineConfig, entryLogPlugin } from '@dz-web/esboot';
import { BundlerVite as Bundler } from '@dz-web/esboot-bundler-vite';

export default defineConfig({
  plugins: [
    entryLogPlugin({
      devOnly: true, // 仅在开发阶段打印，默认值为 true
    }),
  ],
  bundler: Bundler,
  isSP: true,
});
```

### 参数配置

`entryLogPlugin` 接收一个可选的对象参数：

| 参数 | 类型 | 默认值 | 说明 |
| :--- | :--- | :--- | :--- |
| `devOnly` | `boolean` | `true` | 是否只在开发模式下输出。若设为 `false`，生产构建（build）时也会在控制台打印入口信息。 |

### 输出示例

注册该插件后，在编译完成时，控制台将输出如下格式化信息：

```text
Compile Entry Details (Total: 2 pages, Platform: pc, PageType: _browser):
==================================================

Page 1: ssg-demo
  URL:       http://172.16.11.89:14000/ssg-demo.html
  Entry:     src/platforms/pc/_browser/modules/ssg-demo.entry.tsx
  Template:  template/disable-rem.html
  Title:     pc-browser-ssg-demo

--------------------------------------------------

Page 2: test
  URL:       http://172.16.11.89:14000/test.html
  Entry:     src/platforms/pc/_browser/modules/test.entry.tsx
  Template:  template/disable-rem.html
  Title:     pc-browser

==================================================
```

- **高亮显示**：控制台输出中使用不同的颜色进行标注，便于快速查看 URL 与页面文件名。
- **相对路径**：入口文件路径自动缩短为相对于项目根目录（`cwd`）的相对路径，保持控制台整洁。
