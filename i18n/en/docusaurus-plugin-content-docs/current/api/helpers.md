---
sidebar_position: 1
---

# Helpers

## getImportPluginsOfRsuite

Used with `babel-plugin-import` to manually recover tree-shaking behavior when automatic splitting is not enough.

This helper ships with built-in behavior for [rsuite](https://rsuitejs.com/).

### Usage

```ts
import { defineConfig, getImportPluginsOfRsuite } from '@dz-web/esboot';

export default defineConfig((runtimeCfg) => ({
  extraBabelPlugins: [getImportPluginsOfRsuite()],
}));
```

### API

```ts
type GetImportPluginsOfRsuite = (noCssCompList?: string[]) => BabelPlugin;
```

`noCssCompList` is used for components that do not ship styles.
