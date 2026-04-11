---
sidebar_position: 2
title: ESLint
---

`ESBoot@4` uses the `eslint@9` flat config model and ships with production-tested defaults.

## Getting Started

Create `eslint.config.mjs` in the project root:

```js
import { createConfig } from '@dz-web/esboot/eslint';

export default createConfig();
```

## Built-in Rule Sets

ESBoot bundles presets such as:

- `tailwindcss`
- `react`
- `typescript`
- `typescript react`
- `stylistic`
- `vue`

## Built-in Custom Rules

### no-cross-platform-imports

Prevents platform-specific code from importing code that belongs to another platform in `MP` mode.

Typical rule of thumb:

- shared code goes under `src/helpers/`
- platform-specific code goes under `src/platforms/{platform}/`
- host-specific code goes under `src/platforms/{platform}/_{env}/`

### no-cross-platform-lib-imports

Prevents platform-specific code from importing the wrong third-party UI libraries, for example using desktop-only libraries inside mobile code.

## Customization

`createConfig` supports project-level overrides for:

- React and Vue enablement
- base antfu config options
- file-type-specific config
- global settings and rules
- extra flat-config entries
