---
sidebar_position: 1
---

# To ESBoot V4

## 自动升级 (推荐)

`ESBoot`提供了 `@dz-web/esboot-codemod` 自动化升级工具，可以快速将项目从 v3 迁移至 v4。

在项目根目录下运行以下命令即可：

```bash
pnpx @dz-web/esboot-codemod upgrade-v4
# 或者使用 pnpm dlx
pnpm dlx @dz-web/esboot-codemod upgrade-v4
```

该工具会自动更新 `package.json` 中的相关依赖、转换 CSS 入口、升级 TailwindCSS 配置、适配 Flat Config 等。

---

## 手动升级

### 添加`eslint.config.mjs`

因为`eslint`的升级，现在配置文件必须是单独的文件，所以要在项目根目录添加`eslint.config.mjs`文件。

*eslint.config.mjs*

```mjs
import { createConfig } from '@dz-web/esboot/eslint';

export default createConfig();
```

与此同时可以移除`package.json`中的`eslintConfig`字段。

## 更新css文件入口

在v3的时候，css的入口是`styles/main.scss`。v4的时候要把`main.scss`改成`index.scss`。

### tailwindcss

如果使用了tailwindcss，v3的时候里面会有入口标记。

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

去掉这个标记，换成`@dz-web/esboot-browser`入口导入。

```css
@use '@dz-web/esboot-browser';
```
