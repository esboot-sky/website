---
sidebar_position: 999
---

# Changelog

## v4.0.0

### Bundler-vite

- fix: Handle import * as variableName syntax
- fix: StyleName has a whitespace
- fix: Scss file does not provide an export named `default`

- feat: Warning when not found styleName like webpack.
- feat: `support tailwindcss@4`
- chore: Upgrade `vite-plugin-static-copy@2` to `@3`
- chore: Upgrade `vite@5` to `@7`
- chore: Upgrade `express@4` to `@5`

### Bundler-webpack

- feat: extraBabelIncludes support to absPath or npm pkg
- fix: build time is 0
- fix: tailwindcss not work after build by webpack
- chore: support import x from x.scss
- chore: Remove Webpackbar
- chore: Change cjs to esm
- chore: remove `postcss-normalize`
- chore: remove `postcss-flexbugs-fixes`

### Browser

- add `userAgent`, `isBrowser`, `isAndroid`, `isIos`
- add `createExternalConsole`

### Browser-react

- add `React Error boundary`

### ESLint

- Restrict key in lang json
- 8 => 9 / flat config

### Stylelint

- Refactor config

### Plugin-vue

### Template

### ESBoot

- Replace biome to eslint(antfu/eslint-config).
- upgrade node engine to 20.19.0.
- vite@5 => vite@7.