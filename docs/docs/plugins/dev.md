---
sidebar_position: 1
---

# Plugins

ESBoot 插件系统允许用户在构建过程中添加自定义行为。插件可以用于扩展 ESBoot 的功能，例如添加新的命令行选项、修改构建过程、生成额外的文件等。

比如，我们可以添加一个插件，用于

<!-- 待补充

```ts
import type { Plugin } from '@dz-web/esboot';

export default (): Plugin => {
  return {
    key: 'plugin-vitest',
    registerCommands: (program) => {
      //
    },
  };
};
``` -->
