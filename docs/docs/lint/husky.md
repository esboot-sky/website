---
sidebar_position: 5
title: Husky
---

## 介绍

`ESBoot@4`基于`Husky@8`和`lint-staged@15`进行Git hooks的检测。

## 开始使用

在`package.json`中添加以下配置：

```json
{
  "lint-staged": {
    "*.{js,jsx,ts,tsx}": "eslint",
    "*.{scss,css}": "stylelint"
  }
}
```

在`commit`阶段会自动执行`lint-staged`命令来进行检测，你也可以手动调用`esboot exec_git_hooks --type pre-commit`命令来手动检测。
