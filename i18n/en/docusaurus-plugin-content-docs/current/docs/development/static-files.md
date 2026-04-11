---
sidebar_position: 6
---

# Static

## Static Files

Static files are picked up automatically from the `config` directory.

For a file like `esboot.txt`, the rules are:

1. `config/static/esboot.txt` applies to all platforms and is emitted to `dist/static/esboot.txt`
2. `config/mobile/static/esboot.txt` only applies when `ESBOOT_PLATFORM=mobile`
3. `config/mobile/browser/static/esboot.txt` only applies when both platform and page type match

When multiple files exist, the more specific one wins: `3 > 2 > 1`.

## Runtime Config

Projects often expose runtime configuration through an external `config.js` file that is copied into output.

Do not read unknown globals directly everywhere in application code.

### Avoid

```ts
const xx = window.GLOBAL_CONFIG.xx;
```

### Prefer

Wrap config access behind a singleton or helper that provides:

- fallback values
- warnings for missing required config
- one central read path

This keeps runtime config safer and easier to maintain.
