---
sidebar_position: 0
---

# Platforms

`ESBoot` supports two modes: `MP` (Multi Platforms) and `SP` (Single Platform). Switch between them with [isSP](../config#issp).

## Mode Comparison

| Feature | MP | SP |
| --- | --- | --- |
| Full name | Multi Platforms | Single Platform |
| Typical use case | A business app that must run on multiple platforms | A project that only targets one platform |
| Supported platforms | `pc-browser`, `pc-native`, `mobile-browser`, `mobile-native` | a single `browser` or `native` target |
| Code reuse | Shared logic with platform-specific outputs | Conventional project layout |
| Directory structure | More complex | Simpler |
| Config complexity | Per-platform | Single set of config |

## MP (Multi Platforms)

MP is designed for business applications that need to run on several platforms at the same time.

### Supported Platforms

- `pc-browser`
- `pc-native`
- `mobile-browser`
- `mobile-native`

### Design Goal

The main benefit of MP is sharing one set of business logic while still producing platform-specific code where required.

Typical assumptions:

- `mobile` and `pc` often share most business behavior while the UI differs
- `browser` and `native` often share most UI while the host integration differs

That makes it realistic to share one business core and only split the truly platform-specific parts.

### Organizing Code

Follow a "general to specific" rule:

- platform-independent code goes to `src/helpers/`
- platform-specific code goes to `src/platforms/{platform}/`
- host-specific code goes to `src/platforms/{platform}/_{env}/`

The same idea also applies to `components`, `hooks`, `utils`, and so on.

### Platform-Difference Code

ESBoot provides `multi-platforms.ts` for cases where implementation differs by platform but the business call site should stay stable.

For example, browser and native versions of `sayHello` can be implemented separately, while business code always imports from `@/helpers/multi-platforms`.

### Config Directory

MP projects also have layered config directories. The more specific directory overrides the more general one.

## SP (Single Platform)

SP is better suited for admin systems, H5 pages, mini-program wrappers, or any project that only needs one platform.

Its structure is much simpler:

```plaintext
src/
  ├── components/
  ├── helpers/
  ├── hooks/
  ├── utils/
  └── *.entry.tsx
```

And the config layout is usually:

```plaintext
config/
  ├── config.js
  ├── bridge/
  └── template/
      └── index.html
```
