---
sidebar_position: 3
title: Webpack Admin to ESBoot V4
---

# Install ESBoot

```sh
pnpm install @dz-web/esboot @dz-web/esboot-bundler-vite @dz-web/esboot-plugin-vue
```

## 添加.esbootrc.ts

```ts
import type { BundlerViteOptions as BundlerOptions } from '@dz-web/esboot-bundler-vite';
import { defineConfig } from '@dz-web/esboot';
import { BundlerVite as Bundler } from '@dz-web/esboot-bundler-vite';
import pluginVue from '@dz-web/esboot-plugin-vue'

export default defineConfig<BundlerOptions>({
  plugins: [
    pluginVue(),
  ],
  bundler: Bundler,
  isSP: true,
  svgr: false,
  bundlerOptions: {},
});
```

## 清理无用文件

保留结构为

```plaintext
.
├── config
  ├── config.js
  ├── static
  └── template
├── eslint.config.mjs
├── node_modules
├── package.json
├── src
└── tsconfig.json
```

把原先的`index.html`迁移到`template`目录下，命名为`index.html`。

## static

把原先的public目录迁移到`static`目录下。

修改原先的`getAssetPaht`

```diff
export function getAssetPath(relativePath: string): string {
  const publicPath = import.meta.env.VITE_PUBLIC_PATH || '/'
  const cleanPublicPath = publicPath.endsWith('/') ? publicPath : `${publicPath}/`
  const cleanRelativePath = relativePath.startsWith('/') ? relativePath.slice(1) : relativePath

- return `${cleanPublicPath}${cleanRelativePath}`
+ return `${cleanPublicPath}static/${cleanRelativePath}`
}

export default getAssetPath
```
