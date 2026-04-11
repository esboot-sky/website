---
sidebar_position: 3
title: Plugin Vue
---

The Vue plugin adds full Vue 3 development support to ESBoot.

It includes:

- `@vitejs/plugin-vue`
- `@vitejs/plugin-vue-jsx`
- `vite-plugin-vue-devtools`

## Config

```ts
import { defineConfig } from '@dz-web/esboot';
import vuePlugin from '@dz-web/esboot-plugin-vue';

export default defineConfig({
  plugins: [vuePlugin()],
});
```

## Main Options

### vueDevToolsOptions

Configure Vue DevTools integration, including whether it is enabled, whether component inspector is enabled, and which editor should be launched.

### jsxOptions

Controls Vue JSX support. JSX is disabled by default and must be explicitly enabled.

## Notes

- currently only supports the Vite bundler
- React-oriented plugins are filtered to avoid conflicts with Vue mode
