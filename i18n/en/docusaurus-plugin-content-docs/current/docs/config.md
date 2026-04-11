---
sidebar_position: 3
---

# Config

Project-level ESBoot configuration lives in `.esbootrc.ts` at the repository root.

The file is a regular Node module. It is consumed by the ESBoot CLI and is **not** bundled into browser output.

## Example

```ts
import { defineConfig } from 'esboot';

export default defineConfig({
  outputPath: 'dist',
});
```

:::tip About defineConfig

Wrapping config with `defineConfig` improves type hints and auto-completion while editing. You can still export a plain object if you do not need that.

:::

## bundler

**Type**: `Bundler`

Select the bundler implementation:

- [Webpack](./bundler-webpack)
- [Vite](./bundler-vite)
- [Rspack](./bundler-rspack)

## bundlerOptions

**Type**: `BundlerOptions`

Bundler-specific configuration. Refer to the selected bundler's documentation.

## isSP

**Type**: `boolean`

**Default**: `false`

Whether the project runs in single-platform mode. See [Platforms](./guides/platforms) for details.

## plugins

`since v2.8.0`

**Type**: `Plugin[]`

Add extra capabilities through the [plugin](./plugins/dev) system.

## server

Development server configuration.

### proxy

**Type**: `object`

**Default**: `{}`

Proxy configuration, aligned with [devServer.proxy](https://webpack.js.org/configuration/dev-server/#devserverproxy).

```ts
proxy: {
  '/api': {
    target: 'http://jsonplaceholder.typicode.com/',
    changeOrigin: true,
    pathRewrite: { '^/api': '' },
  },
}
```

:::warning Note

`proxy` only works in `dev` mode.

:::

### https

**Type**: `boolean`

**Default**: `false`

Equivalent to [devServer.https](https://webpack.js.org/configuration/dev-server/#devserverhttps).

### http2

**Type**: `boolean`

**Default**: `false`

Equivalent to [devServer.http2](https://webpack.js.org/configuration/dev-server/#devserverhttp2).

### open

**Type**: `boolean`

**Default**: `false`

Equivalent to [devServer.open](https://webpack.js.org/configuration/dev-server/#devserveropen).

### port

**Type**: `number`

**Default**: `8900`

Equivalent to [devServer.port](https://webpack.js.org/configuration/dev-server/#devserverport).

:::note About Vite

With the Vite bundler, ESBoot uses both `port` and `port + 1`. For example, setting `8080` means ESBoot also uses `8081`. Keep at least a two-port gap between projects.

:::

## outputPath

**Type**: `string`

**Default**: `dist`

Equivalent to [output.path](https://webpack.js.org/configuration/output/#outputpath).

:::note

`esboot preview` also uses this path by default.

:::

## useLangJsonPicker

**Type**: `boolean`

**Default**: `true`

Whether to enable picking specific keys from language JSON files.

When enabled, it works together with [langJsonPicker](./development/entry-files#langjsonpicker) to reduce the final i18n payload.

:::warning Note

Because of how `useLangJsonPicker` works, the `mfsu` implementation does not support object-form `entry`, so the feature is ineffective in `dev` mode when the two conflict. Production output is not affected.

:::

:::warning Path Restriction

Only files under `src/lang/*.json` are processed.

:::

## minimize

**Type**: `boolean`

**Default**: `true`

Disable JavaScript and CSS minification with one switch.

## jsMinifier

**Type**: `JsMinifier`

**Default**: `JsMinifier.terser`

Choose the JavaScript minifier.

```ts
enum JsMinifier {
  terser = 'terser',
  swc = 'swc',
  none = 'none',
}
```

## jsMinifierOptions

**Type**: `object`

**Default**: `{}`

Options for the chosen JavaScript minifier.

## css

`since 4.1.0`

CSS-related options.

### modules.useStyleName

**Type**: `boolean`

**Default**: `true`

Whether to enable `styleName`.

### modules.localsConvention

Controls how CSS Modules export keys are transformed.

## cssMinifier

**Type**: `CSSMinifier`

**Default**: `CSSMinifier.cssnano`

Choose the CSS minifier.

## cssMinifierOptions

**Type**: `object`

**Default**: `{}`

Options for the chosen CSS minifier.
