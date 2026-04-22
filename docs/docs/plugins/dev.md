---
sidebar_position: 1
---

# Introduction

ESBoot 插件系统允许用户在构建过程中添加自定义行为。插件可以用于扩展 ESBoot 的功能，例如添加新的命令行选项、修改构建过程、生成额外的文件等。

## 使用

```ts
import { defineConfig, definePlugin, PluginHooks } from "@dz-web/esboot";

export default defineConfig({
  plugins: [
    definePlugin({
      name: "plugin-key",
      apply: "build",
      [PluginHooks.afterCompile]: (cfg, ctx) => {
        console.log("afterCompile", ctx.command, cfg);
      },
    }),
  ],
});
```

`plugins` 是一个数组，数组内的每一个对象都是一个插件。插件的执行顺序由 `enforce` 和配置顺序共同决定。

## 第三方插件

你也可以使用已经封装好的插件，比如 [vitest](./plugin-vitest) 和 [tailwind3](./plugin-tailwind3)。

## 插件开发

插件开发可以参考[插件开发文档](../../api/plugin.md)。
