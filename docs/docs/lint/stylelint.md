---
sidebar_position: 3
title: Stylelint
---

## 介绍

`ESBoot@4`基于`stylelint@16`，并且内置了项目的最佳实践配置。在大部分情况下不需要再额外配置。

## 开始使用

在`package.json`中添加以下配置：

```json
"stylelint": {
  "extends": [
    "./node_modules/.cache/esboot/stylelint"
  ]
}
```

## 扩展配置

参考[customize](https://stylelint.io/user-guide/customize)。

如：

```diff
"stylelint": {
  "extends": [
    "./node_modules/.cache/esboot/stylelint"
  ],
+ "rules": {
+   "declaration-property-unit-allowed-list": {
+     "/^border/": ["px"],
+     "/^padding|^gap/": ["rem"]
+   },
+   "unit-allowed-list": ["%", "deg", "px", "rem", "ms"]
+ }
}
```
