---
sidebar_position: 1
---

# Introduction

ESBoot 插件系统允许用户在构建过程中添加自定义行为。插件可以用于扩展 ESBoot 的功能，例如添加新的命令行选项、修改构建过程、生成额外的文件等。

## 使用

```ts
import { defineConfig, type Configuration, PluginHooks } from '@dz-web/esboot';

export default defineConfig({
  plugins: [
    {
      key: 'plugin-key',
      [PluginHooks.afterCompile]: (cfg) => {
        console.log('afterCompile', cfg);
      },
    },
  ],
});
```

`plugins` 是一个数组，数组内的每一个对象都是一个插件。插件的执行顺序是按照数组顺序执行的。

## 第三方插件

你也可以使用已经封装好的插件，比如 [vitest](./plugin-vitest)。

## 插件开发

插件开发可以参考[插件开发文档](../../api/plugin.md)。
