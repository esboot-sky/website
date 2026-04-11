---
sidebar_position: 1
---

# Environment Variables

## `.env` Files

ESBoot supports:

- `.env`: shared variables, usually committed
- `.env.local`: local-only overrides, usually ignored by Git

:::tip Recommended Tool

The [ESBoot extension](../getting-started#esboot) helps switch environment files quickly.

:::

Priority is:

`.env.local` > `.env`

## Variables

### Platform-related

#### ESBOOT_PLATFORM

Target platform: `pc` or `mobile`.

#### ESBOOT_PAGE_TYPE

Target host type: `browser` or `native`.

Typical combinations are:

- `mobile + browser`
- `mobile + native`
- `pc + browser`
- `pc + native`

### Content Matching

#### ESBOOT_CONTENT_PATH

Restrict startup/build scanning to a specific path.

#### ESBOOT_CONTENT_PATTERN

Filter pages using a pattern.

#### ESBOOT_CONTENT_IGNORE

Ignore specific pages or glob groups.

These are especially useful in large MPA projects where starting every page at once is too expensive.

### Mock-related

#### BRIDGE_MOCK_HOST

Host for bridge-mock.

#### BRIDGE_MOCK_PORT

Port for bridge-mock.

See [bridge-mock](http://asset.dzfe.net/ld/bridge-mock/#/) for more details.
