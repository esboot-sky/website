---
sidebar_position: 1
---

# Introduction

The ESBoot plugin system lets users attach custom behavior during the build pipeline. Plugins can extend commands, modify config, generate files, and hook into build steps.

## Usage

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

Plugins run in array order.

## Third-party Plugins

You can also use prebuilt plugins such as [vitest](./plugin-vitest).

## Developing Plugins

See the [plugin API](../../api/plugin.md).
