---
sidebar_position: 1
---

# To ESBoot V3

## 删除.husky

删除根目录的.husky目录

:::info
   为了保证后续更新钩子的灵活性，现在会自动创建
:::

## 更新Package.json

*package.json*

```diff
{
  "scripts": {
-    "postinstall": "esboot postinstall",

+    "prepare": "esboot prepare",
  },
  "dependencies": {
+    "@dz-web/esboot-browser": "^3.0.0",
  },
  "devDependencies": {
-    "@dz-web/esboot": "^2.15.0",
-    "@dz-web/esboot-plugin-tailwindcss": "0.2.0",
-    "@dz-web/esboot-plugin-vitest": "^1.1.7",

+    "@dz-web/esboot": "^3.0.0",
+    "@dz-web/esboot-bundler-webpack": "^3.0.0",
+    "@dz-web/esboot-plugin-vitest": "^3.0.0",
  }
  "stylelint": {
    "extends": [
-      "@dz-web/esboot/config/stylelint"

+      "./node_modules/.cache/esboot/stylelint"
    ]
  },
  "commitlint": {
    "extends": [
-      "./node_modules/@dz-web/esboot/config/commitlint/index.js"

+      "./node_modules/.cache/esboot/commitlint"
    ]
  },
-  "prettier": "./node_modules/.cache/esboot/prettier/index.json",
+  "prettier": "./node_modules/.cache/esboot/prettier",
}
```

## 更新.esbootrc.ts

* .esbootrc.ts *

以标准的mp配置为准

```ts
import { defineConfig, CodeSplittingType } from '@dz-web/esboot';
import vitestPlugin from '@dz-web/esboot-plugin-vitest';
import tailwindcssPlugin from '@dz-web/esboot-plugin-tailwindcss';

export default defineConfig((runtimeCfg) => ({
  plugins: [vitestPlugin(), tailwindcssPlugin()],
  TSChecker: false,
  // port: 8081,
  analyze: false,
  /**
   * 调试库兼容性问题时，可以关闭mfsu
   */
  mfsu: false,
  pxtorem: {
    enable: true,
    // 设计稿为默认750, 浏览器以375为基准，16px是为了方便使用tailwindcss, 32px对应750px设计稿中的16px
    rootValue: runtimeCfg.isMobile ? 32 : 16,
  },
  extraBabelIncludes: [
    /tailwind-merge/i,
    /filter-obj/i,
    /immer/i,
    /zustand/i,
    /query-string/i,
    /react-intl/i,
    /common/i,
    /d3-/i,
    /@tanstack/i,
    /@react-spring/i,
    /@floating-ui/i,
  ],
  codeSplitting: {
    jsStrategy: CodeSplittingType.granularChunks,
    jsStrategyOptions: {
      // 为了提高首屏速度，我们把一些非常非常常用的库打进公共代码库里, 不常用的让跟着页面js加载，以免影响大部分小页面的加载与js解析速度
      frameworkBundles: [
        // 不要添加router进来，我们绝大多数页面都是嵌入到webview中用的小页面，不需要router，所以router不需要打进公共代码库里。会影响大部分页面的加载速度
        '@dz-web/bridge',
        'dayjs',
        '@tanstack/react-query',
        'redux',
        'redux-thunk',
        'react-redux',
        '@reduxjs/toolkit',
        'zustand',
        'immer',
        'lodash',
        'nanoid',
        '@dz-web/axios',
        '@dz-web/axios-middlewares',
        'axios',
        'react-intl',
        '@loadable/component',
        'classnames',
        'perfect-scrollbar',
      ]
    },
  },
  define: {
    'process.env.isMobile': runtimeCfg.isMobile as any,
    'process.env.isBrowser': runtimeCfg.isBrowser as any,
  },
}));

export const afterHooks = (cfg) => {
  console.log(Object.entries(cfg._entry), '<-- cfg');
}
```

修改后为:

* .esbootrc.ts *

```ts
export default defineConfig({
  // ...
});
```

## 修改template

移除文件中的

```diff
- <title><%= htmlWebpackPlugin.options.title %></title>
```

:::info
   现在title会自动生成，不需要在template中配置
:::

## 更新docs

### 移除dumi配置文件

移除`docs/docs/.dumirc`文件