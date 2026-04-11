---
sidebar_position: 2
---

# Template

## Overview

Page templates live in `config/template`. The default template is usually `index.html`, but you can switch templates through [entry-files](./entry-files#template).

## Default Template

If there is no `config/template` directory, ESBoot falls back to a minimal built-in HTML template containing only the root container.

## Template Variables

Template files can use values defined through [define](../config#define), for example:

```html
<img class="global_img" src="{{process.env.publicPath}}/static/loading.svg" alt="" />
```

Template replacement is intentionally simple:

- no spaces inside the expression
- single-line variable replacement only
- no logic support

## HTML Loading Screen

For slow networks or heavy pages, adding a lightweight HTML loading state helps distinguish between a slow boot and a broken page.

You can place loading markup and CSS directly in `template/index.html`, then let the application take over once JavaScript is ready.
