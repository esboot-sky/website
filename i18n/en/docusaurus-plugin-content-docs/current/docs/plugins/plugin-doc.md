---
sidebar_position: 5
title: Plugin Doc
---

Provides zero-config project documentation generation.

## Installation

```sh
pnpm install @dz-web/esboot-plugin-doc -D
```

## Usage

```ts
import { defineConfig } from '@dz-web/esboot';
import docPlugin from '@dz-web/esboot-plugin-doc';

export default defineConfig({
  plugins: [docPlugin()],
});
```

Once enabled, the plugin automatically detects the `docs` directory and generates the documentation site.

## Directory Layout

```plaintext
.
├── docs
│   ├── docs
│   │   └── index.md
│   └── public
│       └── images
│           └── dz-logo.jpg
```

## CLI

See [CLI docs](../guides/cli.md#docs) for the `docs` commands.

## public

Files under `/docs/public` are treated as static assets.
