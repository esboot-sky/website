---
sidebar_position: 7
title: Compatibility
description: Compatibility development for ESBoot.
---

## Browserslist

在`ESBoot`项目中，你可以通过`package.json`中的`browserslist`来配置浏览器兼容性。

```json
{
  "browserslist": {
    "development": [
      "last 1 chrome version"
    ],
    "production": [
      "Chrome >= 67"
    ]
  }
}
```

如果是`Multi Platforms`模式，你可以通过`browserslist`中的`pc-native-production`、`pc-browser-production`、`mobile-native-production`、`mobile-browser-production`来配置不同平台下的浏览器兼容性。

```json
{
  "browserslist": {
    "development": [
      "Chrome >= 100"
    ],
    "pc-native-production": [
      "Chrome >= 67"
    ],
    "pc-browser-production": [
      "Chrome >= 67"
    ],
    "mobile-native-production": [
      "ChromeAndroid >= 75",
      "ios_saf >= 12"
    ],
    "mobile-browser-production": [
      "ChromeAndroid >= 75",
      "ios_saf >= 12"
    ]
  },
}
```

更多可选值请参考[browserslist](https://github.com/browserslist/browserslist)。

## node_modules中的包

正常情况下，`node_modules`中的包会自动被排除，不会被编译。但是现在很多现代包的兼容性都打的比较高，如果某个包有不支持的语法，可以强制让这个包被编译。参考[extraBabelIncludes](../bundler-webpack#extrababelincludes)。

:::warning 注意事项

1. 强制让`node_modules`中的包被编译，会导致编译速度变慢，请谨慎使用。

2. 其他bundler都不会使用babel，所以只有`webpack`bundler支持这个功能，其他bundler不支持。
:::
