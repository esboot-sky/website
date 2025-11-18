---
sidebar_position: 6
---

# Template

## 简介

项目的页面模板，用于生成页面。固定放在`config/template`目录下。一般默认是`index.html`，参考[entry-files](./entry-files#template)可以更换模板。

## 默认模板

如果没有`config/template`目录，则会使用默认模板。默认模板为最小html，只有一个`#app`的`div`容器。如果你的项目足够简单，可以直接使用默认模板。

## 模板变量

模板中可以使用[define](../config#define)中的变量。例如：

```html
<div id="root">
  <div class="global_loading">
    <img class="global_img" src="{{process.env.publicPath}}/static/loading.svg" alt="" />
  </div>
</div>
```

:::tip 提示

模板变量会自动替换为对应的值，但是要注意不要有空格，模板目前也只支持单行变量替换，所以不要写逻辑。

:::
