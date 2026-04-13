---
sidebar_position: 4
title: Plugin Tailwind3
---

# Plugin Tailwind3

`plugin-tailwind3` 用于把项目切换到 Tailwind 3。它本身不实现 Tailwind，只负责把 ESBoot 的 CSS 配置改成适配 Tailwind 3 的默认值，并且把 `tailwindcss` 依赖一并带上。

它主要是为了解决 Tailwind Next 在一些项目里的兼容性压力：如果你暂时不想跟着 Next 的节奏升级，或者项目里有比较重的历史样式包袱，这个插件可以让你直接把 Tailwind 3 收进 ESBoot 的插件体系里，而不用在项目里手动补一堆 Tailwind 3 相关配置。

## 安装

```sh
pnpm add @dz-web/esboot-plugin-tailwind3 -D
```

## 使用

在 `.esbootrc.ts` 中引入插件即可：

```ts
import { defineConfig } from '@dz-web/esboot';
import pluginTailwind3 from '@dz-web/esboot-plugin-tailwind3';

export default defineConfig({
  plugins: [pluginTailwind3()],
});
```

插件会自动把配置切换成：

```ts
css: {
  tailwind: {
    enable: true,
    version: '3',
    separateImports: false,
  },
}
```

也就是说：

- `tailwindcss` 会随插件一起安装
- 项目本身不需要再单独安装 `tailwindcss`
- `version` 会切到 `3`
- `separateImports` 对 Tailwind 3 不生效，因此会保持 `false`
- `prepare` 会在 `node_modules/.cache/esboot/tailwindcss.config.js` 写出 Tailwind 3 的 IntelliSense 配置，VSCode 会自动指向这个文件

## 适用场景

- 你想在同一个 ESBoot 项目里显式使用 Tailwind 3
- 你希望把 Tailwind 3 的兼容压力收进一个插件，而不是污染正常的 Tailwind Next 逻辑
- 你希望保留默认的现代浏览器配置，不影响其他 CSS 行为
- 你希望通过插件方式切换 Tailwind 版本，而不是在每个项目里手写相同配置

## 配置关系

如果你同时手写了 `css.tailwind`，插件会把项目切到 Tailwind 3 的默认形态。通常建议二选一：

- 直接使用 `pluginTailwind3()`
- 或者手动写 `css.tailwind.version = '3'`

如果你使用 `pluginTailwind3()`，不需要再额外配置 `separateImports`，也不需要在项目里手动声明 `tailwindcss`。

如果项目里同时还在用 Tailwind Next，保持默认 `css.tailwind.version: 'next'` 就行。`pluginTailwind3()` 只会影响装了它的项目，不会改动 ESBoot 其他项目的正常 Tailwind Next 路径。
