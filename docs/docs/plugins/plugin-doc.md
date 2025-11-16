---
sidebar_position: 5
title: Plugin Doc
---

提供了无配置创建项目文档功能。

## 安装

```sh
pnpm install @dz-web/esboot-plugin-doc -D
```

## 使用

```ts
import { defineConfig } from '@dz-web/esboot';
import docPlugin from '@dz-web/esboot-plugin-doc';

export default defineConfig({
  plugins: [docPlugin()],
});
```

无需其他配置，当添加了`docPlugin`后，会自动识别`docs`目录下的文件，并生成文档。

## 目录说明

```plaintext
.
├── docs
│   ├── docs
│   │   └── index.md
│   └── public
│       └── images
│           └── dz-logo.jpg
```

## cli

参考[CLI](../guides/cli.md#docs)命令，使用`docs`命令生成文档。

## public

在`/docs/public`目录下的文件会被识别为静态文件。
