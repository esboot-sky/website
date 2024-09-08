---
sidebar_position: 2
---

# Entry Files

## Matching Rule

`esboot`的规则是匹配平台根目录下的`*.entry.tsx`。

在`SP`模式下，平台根目录是`src`。

在`MP`模式下，会根据`platform`和`pageType`去匹配目录

例如你的`env`文件如下：

```sh
ESBOOT_PLATFORM=mobile
ESBOOT_PAGE_TYPE=native
```

此时启动`dev/build`命令下的`content`就是`src/platforms/mobile/_native`(你也可以通过设置`ESBOOT_CONTENT_PATH`和`ESBOOT_CONTENT_PATTERN`自定义规则，更多参考[env](./environment-variables#esboot_content_path))，然后去寻找下面所有的`*.entry.tsx`当做入口。

例如你有一个`home.entry.tsx`，那么在浏览器中的地址就是`http://localhost:8001/home.html`(域名和端口是基于你的配置决定).

## Page Metadata

入口文件支持一些配置，如页面`title`之类的。写法是在`*.entry.tsx`中导出一个对象，如：

```tsx
// 你的React代码

export default {
  // 代表页面名称为DEMO
  title: 'DEMO',
};
```

下面是支持的配置清单：

### title

页面标题，默认为`文件名称 | ESboot APP`。

### template

模版html地址，默认地址是`config/template/index.html`。

`MP`模式下是`config/{platforms}/template/index.html`。

配置不是一个完整的地址(目录是固定死的)，只需要配置页面名称，比如`my-tpl`，此时的地址就会是`config/{platforms}/template/my-tpl.html`。

### name

页面的唯一资源名称，默认是`文件名称`。

```tsx
// home.entry.tsx
export default {
  name: 'home',
};
```

大部分情况可以不用填。

### langJsonPicker

类型: `string[]`，支持嵌套语法xx.xx.xx。
默认值：空即导入全部

参考[langJsonPicker](../config/#uselangjsonpicker)。

页面标题，默认为文件名称 | ESboot APP。
