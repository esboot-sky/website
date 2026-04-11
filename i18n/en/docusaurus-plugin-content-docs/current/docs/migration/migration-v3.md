---
sidebar_position: 2
---

# To ESBoot V3

## Remove `.husky`

Delete the `.husky` directory at the repository root.

ESBoot v3 creates and manages the relevant hooks automatically.

## Update `package.json`

Main changes:

- replace `postinstall` with `prepare`
- add `@dz-web/esboot-browser`
- upgrade ESBoot packages to v3
- switch `stylelint`, `commitlint`, and `prettier` references to the generated cache paths

## Update `.esbootrc.ts`

The major migration step is moving to the new bundler-specific options layout.

In practice this means:

- choose Webpack and/or Vite bundler options explicitly
- move code splitting config into `bundlerOptions`
- keep shared project-level options in the outer config
- keep your define values, minifier options, and `px2rem` settings in the new structure
