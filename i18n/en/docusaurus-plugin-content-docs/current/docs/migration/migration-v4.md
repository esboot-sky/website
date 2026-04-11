---
sidebar_position: 1
---

# To ESBoot V4

## Add `eslint.config.mjs`

Because of the ESLint upgrade, config now needs to live in its own file:

```mjs
import { createConfig } from '@dz-web/esboot/eslint';

export default createConfig();
```

After that, you can remove the old `eslintConfig` field from `package.json`.

## Update the CSS Entry File

In v3, the main stylesheet entry was `styles/main.scss`.

In v4 it becomes `styles/index.scss`.

### Tailwind CSS

If the v3 project used Tailwind, replace the old Tailwind directives with:

```css
@use '@dz-web/esboot-browser';
```
