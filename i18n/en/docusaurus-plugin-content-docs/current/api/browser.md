---
sidebar_position: 4
title: Browser
---

`@dz-web/esboot-browser` is the browser-side utility package for ESBoot.

## Installation

```sh
pnpm install @dz-web/esboot-browser
```

## AOP

### createExternalConsole

Creates an external console for environments where the native browser console is not enough. The default implementation uses `eruda`.

```ts
interface CreateExternalConsoleOptions {
  enabled?: boolean;
  timeout?: number;
  resourceUrl?: string;
}
```

Common options:

- `enabled`: defaults to `window?.GLOBAL_CONFIG?.debug ?? false`
- `timeout`: load timeout in milliseconds, default `10000`
- `resourceUrl`: defaults to `https://cdn.jsdelivr.net/npm/eruda`

## Utils

### flattenLangObject

Flattens nested translation JSON for use with `react-intl` message maps.

```json
{
  "a": 1,
  "b": { "c": 2 }
}
```

becomes:

```json
{
  "a": 1,
  "b.c": 2
}
```

## Constants

The package exports common browser-related constants such as:

- `userAgent`
- `isIOS`
- `isAndroid`
- `isDZApp`
- `isDZAppByDS`

## Style Helpers

### cn

A combined helper built from `clsx` and `twMerge`, similar to the `cn` helper popularized by shadcn/ui.

## Style Libs

The package also re-exports utilities such as:

- `cva`
- `clsx`
- `twMerge`
