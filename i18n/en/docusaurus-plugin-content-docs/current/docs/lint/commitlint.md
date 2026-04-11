---
sidebar_position: 4
title: Commitlint
---

`ESBoot@4` uses `commitlint@20` to validate commit messages.

## Getting Started

Add the following to `package.json`:

```json
"commitlint": {
  "extends": [
    "./node_modules/.cache/esboot/commitlint"
  ]
}
```

## Rules

ESBoot is based on `@commitlint/config-conventional` and includes common checks such as:

- commit type must be lowercase
- commit type cannot be empty
- commit type must belong to the standard allowed list
- subject cannot be empty
- subject should not end with `.`
- header length should stay within `100` characters
- body and footer should respect blank-line and line-length conventions

Common valid types include:

- `build`
- `chore`
- `ci`
- `docs`
- `feat`
- `fix`
- `perf`
- `refactor`
- `revert`
- `style`
- `test`
