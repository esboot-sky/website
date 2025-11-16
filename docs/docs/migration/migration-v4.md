---
sidebar_position: 1
---

# To ESBoot V4

## 添加`eslint.config.mjs`

因为`eslint`的升级，现在配置文件必须是单独的文件，所以要在项目根目录添加`eslint.config.mjs`文件。

*eslint.config.mjs*

```mjs
import { createConfig } from '@dz-web/esboot/eslint';

export default createConfig();
```

## 更新css文件入口

在v3的时候，css的入口是`styles/main.scss`。v4的时候要把`main.scss`改成`index.scss`。

### tailwindcss

如果使用了tailwindcss，v3的时候里面会有入口标记。

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

去掉这个标记，换位`@dz-web/esboot-browser`入口导入。

```css
@use '@dz-web/esboot-browser';
```
