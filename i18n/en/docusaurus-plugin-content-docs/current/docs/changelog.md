---
sidebar_position: 999
---

# Changelog

## 4.3.14

`260702`

### Plugins

- feat: add built-in `entryLogPlugin` to print styled console logs of compile/build entries (including URL, path, template, title) after compile completes, supporting Platform/PageType display in multi-platform (MP) mode. See [Built-in Plugins](./plugins/builtin.md) for details.

## 4.2.0

### Bundler-vite

- fix: `css.modules.useStyleName` not working
- fix: keep `.scss` auto-resolved to CSS Modules while disabling `styleName` transform when `css.modules.useStyleName` is `false`
- fix: treat `.html` requests as HTML responses in Vite dev health checks and e2e boot flow
- feat: support page-level `SSG` in Vite, including build-time prerender and dev-time preview for `ssg` entries

### Bundler-webpack / Bundler-rspack

- fix: make `bundlerOptions.customConfig` return values apply correctly
- fix: detect duplicate entry `chunkName` values and throw with conflicting file paths instead of silently overriding
- refactor: extract shared bundler intent helpers

### Bundler-webpack

- perf: enable webpack filesystem cache in development
- perf: enable `babel-loader` cache in development
- perf: skip `thread-loader` in webpack dev mode for faster cold starts
- perf: add development timing logs for initial compile and rebuilds

### Common

- fix: isolate config default state between `ESBootCfg` instances

### Test

- test: broaden characterization coverage across config loading, entry generation, bundler helpers, plugin hooks, generators, browser helpers, lint packages, and `styleName` transforms
- test: add Playwright coverage for the Vite flow in `examples/sp-base`
- test: add webpack coverage for dev cache behavior and timing plugins

### Docs

- docs: split rendering into a dedicated development guide, document `SSG`, and prepare for future `SSR` support

## 4.1.3

`260321`

### Lint

- feat: upgrade to ESLint 10 and Stylelint 17

## 4.1.1

`260202`

- feat: support [Rspack bundler](./bundler-rspack)

## 4.1.0

`260128`

- feat: support [css options](./config#css)
- fix: Vite debugger location mismatch issue

## 4.0.7

`260108`

- feat: support the [legacy](./bundler-vite#legacy) option in the Vite bundler

## 4.0.6

`251227`

- fix: improve Windows compatibility

## 4.0.2

`251212`

- feat: replace `tsup` with `tsdown`
- chore: remove unused `console.log`

## 4.0.0

`251211`

[ESBoot 4 release note](../../../blog/esboot-4).
