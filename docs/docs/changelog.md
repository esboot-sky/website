---
sidebar_position: 999
---

# Changelog

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

### Test

- test: add broad characterization coverage for config loading, entry generation, bundler helpers, plugin hooks, prepare generators, browser helpers, lint/plugin packages, and styleName transforms
- test: add Playwright coverage for `examples/sp-base` Vite flow, including `styleName` CSS Modules rendering and route navigation
- test: add webpack coverage for dev cache behavior, javascript loader cache behavior, thread-loader dev policy, and performance timing plugin

### Docs

- docs: split rendering into a dedicated development guide, documenting `SSG` now and the planned `SSR` capabilities

## v4.1.3

`260321`

### Lint

- feat: upgrade ESLint@10 and Stylelint@17

## v4.1.1

`260202`

- feat: support [rspack bundler](./bundler-rspack).

## v4.1.0

`260128`

- feat: support [css options](./config#css).
- fix: Vite Debugger Location Mismatch Issue。

## v4.0.7

`260108`

- feat: support [legacy](./bundler-vite#legacy) config in vite bundler.

## v4.0.6

`251227`

- fix: compatibility with windows.

## v4.0.2

`251212`

- feat: change tsup to tsdown.
- chore: remove unused console.log.

## v4.0.0

`251211`

[ESBoot 4](../../../blog/esboot-4).
