---
sidebar_position: 999
---

# Changelog

## 4.3.5

`next`

### Lint

- feat: disable `node/prefer-global/process` rule for files under any `src` directory to allow global `process.env` usage in client-side code

### Plugin

- refactor(plugin-vue): isolate Vue-only Vite integration inside `@dz-web/esboot-plugin-vue`, keep core bundler paths free of Vue dependencies by default, and document that the plugin currently supports Vite only

## 4.3.4

`260610`

### Plugin / Test

- fix(plugin-vitest): decouple shared Vitest config generation from the Vite bundler config path so webpack/rspack projects no longer execute Vite-only `bundlerOptions.customConfig`
- fix(plugin-vitest): split published runtime helpers into dedicated `dist/alias.js` and `dist/options.js` entries and disable bundle splitting to avoid dynamic require failures during config loading
- fix(plugin-vitest): polyfill `window.matchMedia` in the shared Vitest setup for jsdom-based example and app tests
- fix(plugin-vitest): shorten `esboot vitest` failure output so command wrapper errors no longer dump large bundled stacks after Vitest already printed the real failure
- test(examples): add SP and MP example `esbootrc` contract coverage for bundler wiring and plugin-vitest registration

### Bundler

- refactor(bundler-common): move the Vite `react-style-name` transform into `bundler-common` so Vite bundler config and standalone Vitest config can share one implementation
- refactor(bundler-vite): remove the old private `react-style-name` implementation directory and keep only the published runtime helper entry


## 4.3.3

`260605`

- fix(lint): exit with non-zero code on pre-commit check failure

## 4.3.2

`260604`

- fix: auto jump to editor when exec husky install
- fix: normalize global style paths on Windows
- chore(create-esboot): upgrade react-admin/add react-admin-main boilerplate
- feat: unify IP4 source for dev server logs
- feat: add resolve series tools

## 4.3.0

### Plugin

- feat: rework the plugin system around named plugins with `name`, `enforce`, `apply`, and shared runtime context
- feat: keep legacy `key`-based plugins working during the migration period
- test: add coverage for plugin ordering, activation conditions, and hook context propagation
- docs: refresh the plugin API guide to match the new model and migration path

### ESBoot

- fix: merge vitest plugin include entries without dropping `.esbootrc.ts`

## 4.2.0

### Bunder-vite

- fix: `css.modules.useStyleName` not work
- fix: keep `.scss` auto-resolved to CSS Modules while disabling `styleName` transform when `css.modules.useStyleName` is `false`
- fix: treat `.html` requests as HTML responses in Vite dev server health checks and e2e boot flow
- feat: support page-level `SSG` in Vite, including build-time prerendering and dev-time preview for `ssg` entry pages

### Bundler-webpack / Bundler-rspack

- fix: make `bundlerOptions.customConfig` returned config actually apply to webpack and rspack bundler config
- fix: detect duplicate entry `chunkName` values and throw with conflicting file paths instead of silently overriding entries
- refactor: extract shared bundler intent helpers for output, devtool, externals, entry/html pages, cache, code splitting, and resolve config

### Bundler-webpack

- perf: enable webpack filesystem cache in development to speed up repeated dev startups
- perf: enable `babel-loader` cache in development
- perf: skip `thread-loader` in webpack development mode to reduce cold-start overhead
- perf: add webpack development timing logs for initial compile and rebuild duration

### Common

- fix: isolate config default state between `ESBootCfg` instances to avoid cross-run mutation leaks
- feat: move Tailwind settings under `css.tailwind`, add Tailwind 3 plugin support that ships its own `tailwindcss` dependency, and remove the root `tailwindcss` fallback
- feat: add `plugin-tailwind3` as the opt-in escape hatch for Tailwind 3 compatibility while keeping the default Tailwind Next path on the modern Vite plugin

### Test

- test: add broad characterization coverage for config loading, entry generation, bundler helpers, plugin hooks, prepare generators, browser helpers, lint/plugin packages, and styleName transforms
- test: add example coverage for the `plugin-vitest` shared Vitest config flow without a local `vitest.config.ts`
- test: add Playwright coverage for `examples/sp-base` Vite flow, including `styleName` CSS Modules rendering and route navigation
- test: add webpack coverage for dev cache behavior, javascript loader cache behavior, thread-loader dev policy, and performance timing plugin

### Docs

- docs: split rendering into a dedicated development guide, documenting `SSG` now and the planned `SSR` capabilities
- docs: document `css.tailwind` usage, including Tailwind 3 and `separateImports` for Tailwind Next
- docs: add a dedicated `plugin-tailwind3` guide explaining the compatibility use case and generated IntelliSense config

## 4.1.3

`260321`

### Lint

- feat: upgrade ESLint@10 and Stylelint@17

## 4.1.1

`260202`

- feat: support [rspack bundler](./bundler-rspack).

## 4.1.0

`260128`

- feat: support [css options](./config#css).
- fix: Vite Debugger Location Mismatch Issue。

## 4.0.7

`260108`

- feat: support [legacy](./bundler-vite#legacy) config in vite bundler.

## 4.0.6

`251227`

- fix: compatibility with windows.

## 4.0.2

`251212`

- feat: change tsup to tsdown.
- chore: remove unused console.log.

## 4.0.0

`251211`

[ESBoot 4](../../../blog/esboot-4).
