---
sidebar_position: 1
---

# Creating plugins

待补充

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
```
