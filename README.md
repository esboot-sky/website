# Website

This website is built with Docusaurus.

## Installation

```bash
pnpm install
```

## Local Development

```bash
pnpm dev
```

This starts the default Chinese locale locally at `http://localhost:8080` with hot reload.

To develop the English locale, run:

```bash
pnpm dev:en
```

Docusaurus development mode only serves one locale per process. If you need to verify the real language switcher locally, use the production-like preview below.

## Local I18n Preview

```bash
pnpm preview:i18n
```

This builds the bilingual site and serves the generated output locally, so `/` and `/en` can be switched exactly like production.

## Build

```bash
pnpm build
```

This generates the static site into the `build` directory.
