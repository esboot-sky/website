---
sidebar_position: 5
title: Husky
---

`ESBoot@4` uses `Husky@8` together with `lint-staged@15` for Git hook checks.

## Getting Started

Add this to `package.json`:

```json
{
  "lint-staged": {
    "*.{js,jsx,ts,tsx}": "eslint",
    "*.{scss,css}": "stylelint"
  }
}
```

These checks run automatically during commit. You can also trigger them manually with:

```sh
esboot exec_git_hooks --type pre-commit
```
