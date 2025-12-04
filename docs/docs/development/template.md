---
sidebar_position: 2
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

## HTML Loading

有时候在弱网环境下，页面加载时间过长，用户可能会长时间看到白屏，所以需要一个 loading 来提升用户体验。

并且来分辨是页面加载慢还是页面报错导致的白屏。

### 实现方式

在 HTML 模板中添加 loading 样式和结构：

`template/index.html`

```html
<head>
  <style>
    .global_loading {
      display: flex;
      justify-content: center;
      align-items: center;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      width: 100%;
      box-sizing: border-box;
      padding: 30px;
      background: transparent;
    }

    .global_img {
      width: 30px;
      height: 30px;
      animation: global_loading_rotate-img 1.5s linear infinite reverse;
    }

    @keyframes global_loading_rotate-img {
      from {
        transform: rotate(360deg);
      }

      to {
        transform: rotate(0deg);
      }
    }
  </style>
</head>

<body>
  <div id="root">
    <div class="global_loading">
      <img class="global_img" src="./static/loading.svg" alt="" />
    </div>
  </div>
</body>
```
