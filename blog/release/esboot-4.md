---
slug: esboot-4
title: ESBoot 4
authors: [Roc]
tags: [Release]
date: 2025-12-15
---

ESBoot 4 is released!

<!-- truncate -->

## What's new

- All In [ES Module](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules)
- [Tailwindcss 4](https://tailwindcss.com/blog/tailwindcss-v4)
- `Pnpm 10`
- `vite 7`
- `ESLint flat config`
- Update all dependencies
- Refactor `Stylelint rules`, add `esboot-stylelint-config`.
- Enhance `esboot-browser`, support more browser tools
- Add `esboot-browser-react`, for browser `React` project support
- Support [vue](https://vuejs.org/)
- Embrace `React Compiler`.
- Fix bugs
- Based on the development of the past year, optimize the `template` code
- Optimize Website UI
- Support [Template](../../docs/4.0/docs/development/template) variable

:::info
Can't wait to try it? Go to [Migrate Guide](../../docs/4.0/docs/migration/migration-v4), and start your new journey with ESBoot 4!
:::

## ESBoot

- Replace biome to eslint(antfu/eslint-config).
- Upgrade node engine to 20.19.0.
- `vite@5` => `vite@7`.
- Upgrade `Bridge Mock@2`

## Bundler

- `px2rem` exclude `node_modules` by default
- Support [assetsInlineLimit](../../docs/4.0/docs/config#assetsinlinelimit) configuration.

## Bundler-webpack

- feat: extraBabelIncludes support to absPath or npm pkg
- fix: build time is 0
- fix: tailwindcss not work after build by webpack
- chore: support import x from x.scss
- chore: Remove Webpackbar
- chore: Change cjs to esm
- chore: remove `postcss-normalize`
- chore: remove `postcss-flexbugs-fixes`

## Bundler-vite

- fix: Handle import * as variableName syntax
- fix: `styleName` has a whitespace
- fix: Scss file does not provide an export named `default`

- feat: Warning when not found styleName like webpack.
- feat: `support tailwindcss@4`
- chore: Upgrade `vite-plugin-static-copy@2` to `@3`
- chore: Upgrade `vite@5` to `@7`
- chore: Upgrade `express@4` to `@5`

## Tailwindcss 4.0

Tailwindcss upgraded to [4.1](https://tailwindcss.com/blog/tailwindcss-v4).

### Breaking Changes

- Config file modified
- Entry file modified

#### Changes from v3

See [changes from v3](https://tailwindcss.com/docs/upgrade-guide#changes-from-v3)

- Remove `@apply`
- Remove `@config`
- Remove `@variants`
- Remove `@responsive`
- Remove `@screen`
- Remove `@variants`

## Browser

- add `userAgent`, `isBrowser`, `isAndroid`, `isIos`
- add `createExternalConsole`

## Browser-react

- add `React Error boundary`

## ESLint

- Refactor config
- [Restrict key in lang json](../../docs/4.0/docs/development/i18n#key命名规范)
- `8 => 9` / [flat config](https://eslint.org/docs/latest/use/configure/configuration-files#flat-config)

## Stylelint

- Refactor config

## Plugin-vue

- Support vue project, see [Plugin-vue](../../docs/4.0/docs/plugins/plugin-vue)

## Template

- React `18.3` => [React 19.2](https://react.dev/blog/2025/10/01/react-19-2)
- `@reduxjs/toolkit` to `Zustand`
- Upgrade to `bridge@3`
- Dynamic import lang
- Improve Code Quality

## Website

- Update UI
- Add `Development` Docs section, like `i18n`/`css` etc.

## Config

- Remove `tailwindcssOptions`
- Add [assetsInlineLimit](../../docs/4.0/docs/config#assetsinlinelimit).
- React Compiler support

### React Compiler Experimental Support

ESBoot v4 added experimental support for [React Compiler](https://react.dev/learn/react-compiler). React Compiler is an automatic optimization tool from the React team, which can automatically perform memoization and other performance optimizations.

#### Configuration

Add to config file:

```typescript
experimental: {
  reactCompiler: {
    enable: true,
    target: '19', // or '18'
  },
}
```

## Next Step

Go to [Roadmap](../../docs/4.0/docs/roadmap) for more details.
