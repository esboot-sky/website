---
sidebar_position: 3
---

# Plugin Vitest

The Vitest plugin provides out-of-the-box unit testing for ESBoot projects.

Built-in dependencies include:

- [vitest](https://vitest.dev/)
- [@testing-library/react](https://testing-library.com/docs/react-testing-library/intro/)
- [@testing-library/user-event](https://testing-library.com/docs/ecosystem-user-event/)

## Config

```ts
import { defineConfig } from '@dz-web/esboot';
import vitestPlugin from '@dz-web/esboot-plugin-vitest';

export default defineConfig({
  plugins: [vitestPlugin()],
});
```

## Run Tests

```sh
pnpm run esboot vitest
```

The command forwards most [Vitest CLI](https://vitest.dev/guide/cli.html) arguments.

Examples:

- `pnpm run esboot vitest --open`
- `pnpm run esboot vitest --watch`
- `pnpm run esboot vitest src/components/Button.test.tsx`
- `pnpm run esboot vitest --coverage`
