---
sidebar_position: 3
title: Stylelint
---

`ESBoot@4` is based on `stylelint@16` and already includes a practical default configuration.

## Getting Started

Add this to `package.json`:

```json
"stylelint": {
  "extends": [
    "./node_modules/.cache/esboot/stylelint"
  ]
}
```

## Extending Rules

You can still append project-specific rules, for example through the standard [customize](https://stylelint.io/user-guide/customize) mechanism.
