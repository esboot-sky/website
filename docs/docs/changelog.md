---
sidebar_position: 999
---

# Changelog

## 4.4.1

`260701`

### Bundler / Common

- refactor: extract common `svgrOptions` merging logic to `@dz-web/esboot-bundler-common` to maximize code reuse across Vite, Webpack, and Rspack bundlers.
- fix(bundler): change the default value of the SVGR `icon` option from `true` to `false` for all bundlers, preserving original SVG dimensions/viewbox by default to prevent large illustrations and banners from shrinking to `1em`.


## 4.4.0

`260629`

### Bundler / Common

- feat(common): add `css.fontZoom` config option to support dynamic font and line-height scaling in development and production. It converts static values to browser-native `calc() + CSS variables` at compile time, and supports `zoomLineHeight`, `minPixelValue` threshold filter, and `exclude` paths for Vite, Webpack, and Rspack.

### Bundler / Rspack

- feat(rspack): support `jsMinifierOptions` to merge custom SWC compression options, allowing users to disable the default `drop_console` and `pure_funcs` rules in production builds.

## 4.3.9

`260624`

### Bundler / Vite

- fix(vite): respect `publicPath` when resolving dev HTML routes and always treat `/static` as a reserved mounted asset prefix, so `/public/*.html` pages still render while `/public/static/**` and `/static/**` requests no longer fall through to the Vite page 404

### Bundler / Rspack

- fix(rspack): align `styleName` behavior completely with Vite by reusing the shared transform path, preserving expression-based `styleName`, merging existing `className` expressions correctly, and supporting lookups across multiple SCSS module imports

## 4.3.7

`260624`

### Bundler / Vite

- fix(vite): optimize i18n virtual module cache invalidation precision — changing `zh-CN.json` now only invalidates modules for that language and leaves other languages cached; also resolves a `404` for `helpers/import-locales.ts` during HMR

### Lint

- chore(lint): separate ESLint and Stylelint pre-commit checks — each linter now prints its own `Start ESLint check...` / `Start Stylelint check...` prompt and only runs when the relevant file types are staged
- chore(lint): upgrade `eslint-plugin-better-tailwindcss` to `4.6.0-esboot5` — adds a plugin-relative `require.resolve` fallback so Tailwind CSS rules activate correctly even when `tailwindcss` is only a transitive dependency (e.g. installed via `esboot-plugin-tailwind3`)

## 4.3.6

`260623`

### Bundler / Rspack

- feat: complete Rspack adapter to full feature parity — aligns entry discovery, `langJsonPicker`, global styles, `styleName`, px2rem, SVGR, Tailwind, code splitting, and minification with the Vite and Webpack implementations

### Bundler / Common

- feat: support `RegExp` in `px2rem.exclude` option so individual rules or file patterns can opt out of px-to-rem conversion

### Tools / Codemod

- feat(codemod): add pre-flight version validation check before applying migrations
- fix(codemod): resolve correct root configuration object for `reactCompiler` option and optimize verification installer



`260622`

### Common / CLI

- feat(common): validate known user config fields from `.esbootrc.ts` at load time while still allowing bundler-specific extension fields to pass through
- fix(cli): replace config-load stack dumps with a short colored error summary that highlights the invalid field and prints the clickable `.esbootrc.ts` file path
- refactor(prepare): reorganize `esboot prepare` around an explicit task pipeline with extracted task/stage resolvers while preserving the existing execution order and CI-only base-task behavior
- feat(prepare): add an opt-in `ESBOOT_PREPARE_DEBUG=1` trace so task execution can be inspected without changing the default prepare output

### Lint

- feat: disable `node/prefer-global/process` rule for files under any `src` directory to allow global `process.env` usage in client-side code
- chore(lint): upgrade `eslint-plugin-better-tailwindcss` to `4.6.0-esboot4`
- fix(lint): restore Windows compatibility for `eslint-plugin-better-tailwindcss` path normalization so git hook ESLint runs no longer crash on Tailwind module resolution
- feat(lint): enable the Tailwind 4 `enforce-canonical-classes`, `enforce-consistent-variant-order`, and `enforce-logical-properties` rules in the default ESBoot lint preset while keeping legacy and new unknown-class rule aliases disabled

### Plugin

- refactor(plugin-vue): isolate Vue-only Vite integration inside `@dz-web/esboot-plugin-vue`, keep core bundler paths free of Vue dependencies by default, and document that the plugin currently supports Vite only
- fix(plugin-vitest): fall back to the standalone Vitest Vite config when reusing the Vite bundler config fails on duplicate entry `chunkName` values, so multi-platform projects can keep same-named entries across environments

### Bundler / Vite

- feat(bundler-vite): support entry-specific language bundling for Vite by generating dynamic import maps for langJsonPicker chunks without duplicating shared module paths
- fix(bundler-vite): prevent MISSING_TRANSLATION warnings during page language transition by introducing a transition state in HOC wrapI18n

### Bundler / Webpack / Rspack

- fix(bundler-webpack/rspack): align `langJsonPicker` entry-specific language bundling with the Vite implementation by removing Webpack layers completely, resolving the long-standing Fast Refresh (hot reload) bugs and using a unified dynamic import mapping with `window.__ESBOOT_ENTRY_NAME__`
- refactor(bundler-webpack/rspack): extract duplicate loaders (`lang-json-picker` and `import-locales-loader`) into `@dz-web/esboot-bundler-common` to maximize code reuse
- feat(bundler-rspack): upgrade Rspack dependencies to latest stable v2 (`@rspack/core: ^2.0.8`) and resolve compatibility issues with the named export `ReactRefreshRspackPlugin`
- perf(bundler-rspack): enable compilation caching in development mode (`cache: isDev`), resolving a performance bottleneck and improving dev startup time by ~83%

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
