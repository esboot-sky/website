---
sidebar_position: 1
---

# Rendering

ESBoot now supports declaring rendering mode at the entry-file level, and that same entry contract is intended to grow into future `SSR` support.

Currently available:

- `SSG`: generate first-screen HTML during build or development

Planned next:

- `SSR`: render dynamically when a request arrives

## Why This Design

Declaring rendering mode in the entry file has several benefits:

- page-level behavior is explicit
- rendering config stays next to metadata like `title`, `template`, and `langJsonPicker`
- evolving from `SSG` to `SSR` does not require inventing a second page contract

## Rendering Modes

| Mode | HTML generation time | First-screen speed | Interactive | Needs request context | Status |
| --- | --- | --- | --- | --- | --- |
| `CSR` | in the browser | normal | yes | no | supported |
| `SSG` | during build/dev | fast | yes, hydration optional | no | supported |
| `SSR` | on each request | fast | yes | yes | planned |

## SSG

Suitable for:

- docs pages
- landing pages
- stable content pages
- pages that want faster first paint with optional hydration later

### Basic Shape

```ts
{
  enable?: boolean;
  hydrate?: boolean;
  render: () => unknown | Promise<unknown>;
}
```

### SSG With Hydration

Generate the first HTML on the server/build side, then let React hydrate it in the browser.

### Pure Static SSG

If a page does not need client interaction, set `hydrate: false`.

### definePage

If you want explicit types, use `definePage`.

### Notes

- avoid direct `window` or `document` access inside `render()`
- if hydration is enabled, make sure browser markup matches the pre-rendered output
- prefer extracting the page body into a reusable component shared by both render paths

:::tip Current Support

At the moment, `SSG` is supported in the `Vite bundler` path.

:::

## SSR

`SSR` differs from `SSG` because HTML is generated per request instead of at build time.

That makes it suitable for:

- request-dependent first-screen data
- user/session-specific output
- pages that depend on URL, headers, cookies, or auth state

The long-term goal is for `SSG` and `SSR` to share one mental model and one entry contract.
