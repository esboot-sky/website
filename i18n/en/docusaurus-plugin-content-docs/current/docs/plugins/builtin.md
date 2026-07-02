---
sidebar_position: 2
title: Built-in Plugins
---

# Built-in Plugins

ESBoot provides built-in plugins that are ready to use out-of-the-box without installing additional npm packages. You can import them directly from `@dz-web/esboot`.

## entryLogPlugin

`entryLogPlugin` is used to print detailed information of all parsed page entries (Entry) in the console after compilation/build completes. It displays details such as page count, platform, page type, entry file paths, HTML templates, and page titles.

It is highly useful in multi-platform (MP) or multi-page projects to clearly show which pages are compiled and active.

### Usage

Import and register the plugin in your `.esbootrc.ts` configuration file:

```ts
import { defineConfig, entryLogPlugin } from '@dz-web/esboot';
import { BundlerVite as Bundler } from '@dz-web/esboot-bundler-vite';

export default defineConfig({
  plugins: [
    entryLogPlugin({
      devOnly: true, // Only log during development phase. Default is true
    }),
  ],
  bundler: Bundler,
  isSP: true,
});
```

### Options

`entryLogPlugin` accepts an optional options object:

| Parameter | Type | Default Value | Description |
| :--- | :--- | :--- | :--- |
| `devOnly` | `boolean` | `true` | Whether to print logs only in development mode. If set to `false`, details will also be printed in the console during production builds. |

### Output Example

After registering this plugin, the console will output the following formatted information once compilation completes:

```text
Compile Entry Details (Total: 2 pages, Platform: pc, PageType: _browser):
==================================================

Page 1: ssg-demo
  URL:       http://172.16.11.89:14000/ssg-demo.html
  Entry:     src/platforms/pc/_browser/modules/ssg-demo.entry.tsx
  Template:  template/disable-rem.html
  Title:     pc-browser-ssg-demo

--------------------------------------------------

Page 2: test
  URL:       http://172.16.11.89:14000/test.html
  Entry:     src/platforms/pc/_browser/modules/test.entry.tsx
  Template:  template/disable-rem.html
  Title:     pc-browser

==================================================
```

- **Color Distinction**: The console output uses distinct colors (green for title header, cyan for name and relative entry path, blue underlined for clickable URL, yellow for template, gray for labels) to make scanning information quick and easy.
- **Relative Paths**: File paths are automatically calculated relative to the project root directory (`cwd`) to keep output clean.
