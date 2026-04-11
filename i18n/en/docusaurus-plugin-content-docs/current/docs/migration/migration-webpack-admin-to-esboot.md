---
sidebar_position: 3
title: Webpack Admin to ESBoot V4
---

This guide summarizes the migration path used by a real admin project when moving from a Webpack/Vite-style setup to ESBoot V4.

## 1. Dependency Updates

Main steps:

- remove old build-tool dependencies and hand-maintained lint config packages
- add ESBoot core, bundler, plugins, and browser runtime packages
- replace scripts with `esboot dev`, `esboot build`, `esboot preview`, and `esboot prepare`

## 2. Create `.esbootrc.ts`

Create an ESBoot config file at the repository root and declare:

- the chosen bundler
- SP mode if applicable
- server port
- extra aliases
- plugin list such as Vitest and Vue
- any bundler-level customization through `bundlerOptions.customConfig`

## 3. Simplify `tsconfig.json`

Usually the project can just extend:

```json
{
  "extends": "./node_modules/.cache/esboot/typescript/tsconfig.json"
}
```

## 4. Move Files Into ESBoot Layout

Typical changes:

- move the old `index.html` to `config/template/index.html`
- move `public/*` assets to `config/static/`
- rename `src/main.ts` to `src/index.entry.ts`

## 5. Adjust Entry Logic

ESBoot entry files should export lifecycle hooks when needed and use ESBoot-compatible public path handling.

## 6. Remove Old Tooling Assumptions

That usually includes:

- old Webpack-only globals
- template-engine syntax inside HTML files
- duplicate lint config files no longer needed after `esboot prepare`
