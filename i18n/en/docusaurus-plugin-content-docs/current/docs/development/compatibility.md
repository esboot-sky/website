---
sidebar_position: 7
title: Compatibility
description: Compatibility development for ESBoot.
---

## Browserslist

In an ESBoot project, browser compatibility is configured with the `browserslist` field in `package.json`.

```json
{
  "browserslist": {
    "development": ["last 1 chrome version"],
    "production": ["Chrome >= 67"]
  }
}
```

For `Multi Platforms` mode, you can define different production targets per platform, such as:

- `pc-native-production`
- `pc-browser-production`
- `mobile-native-production`
- `mobile-browser-production`

See the official [browserslist](https://github.com/browserslist/browserslist) docs for all supported queries.

## Packages Inside node_modules

Normally, packages in `node_modules` are excluded from compilation. If a modern package ships syntax that is too new for your target, you can force it through Babel using [extraBabelIncludes](../bundler-webpack#extrababelincludes).

:::warning Notes

1. Compiling extra packages from `node_modules` will slow down builds.
2. This only works in the `webpack` bundler because other bundlers do not use Babel in the same way.

:::
