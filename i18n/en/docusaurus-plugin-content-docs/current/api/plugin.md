---
sidebar_position: 2
title: Plugin
---

## onActivated

```ts
onActivated?: (cfg: Configuration) => void;
```

Runs when a plugin is registered.

## prepare

```ts
prepare?: (cfg: Configuration) => void;
```

Runs during `esboot prepare`.

## modifyConfig

```ts
[PluginHooks.modifyConfig]?: (config: Configuration) => Partial<Configuration>;
```

Runs after config is loaded and before it is used.

:::info

Do not mutate the incoming config object directly. Return partial overrides instead.

:::

## registerCommands

```ts
[PluginHooks.registerCommands]?: (cfg: Configuration) => Command[];
```

Registers extra CLI commands.

## modifyTypescriptConfig

Allows a plugin to customize generated `tsconfig.json` content during `prepare`.

## modifyPrettierConfig

Allows a plugin to customize generated Prettier config during `prepare`.

## modifyStylelintConfig

Allows a plugin to customize generated Stylelint config during `prepare`.

## modifyEslintConfig

Allows a plugin to customize generated ESLint config during `prepare`.

## modifyBundlerConfig

The bundler hook continues the same pattern: receive the current config context and return the extra configuration that should be merged in.
