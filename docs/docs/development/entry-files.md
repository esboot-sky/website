---
sidebar_position: 0
---

# Entry Files

## Matching Rule

`ESBoot` 的规则是匹配平台根目录下的 `*.entry.{tsx,ts}` 文件作为入口。

### SP 模式

在 `SP` 模式下，平台根目录是 `src`。

```plaintext
src/
  ├── home.entry.tsx
  ├── about.entry.tsx
  └── ...
```

### MP 模式

在 `MP` 模式下，会根据 `platform` 和 `pageType` 去匹配目录。

例如你的 `.env` 文件如下：

```sh
ESBOOT_PLATFORM=mobile
ESBOOT_PAGE_TYPE=native
```

此时启动 `dev/build` 命令下的 `content` 就是 `src/platforms/mobile/_native`（你也可以通过设置 `ESBOOT_CONTENT_PATH` 和 `ESBOOT_CONTENT_PATTERN` 自定义规则，更多参考[环境变量](./environment-variables#esboot_content_path)），然后去寻找下面所有的 `*.entry.{tsx,ts}` 当做入口。

```plaintext
src/platforms/mobile/_native/
  ├── home.entry.tsx
  ├── about.entry.tsx
  └── ...
```

### URL 映射规则

例如你有一个 `home.entry.tsx`，那么在浏览器中的地址就是 `http://localhost:8001/home.html`（域名和端口是基于你的配置决定）。

:::tip 自定义匹配规则

可以通过设置以下环境变量来自定义匹配规则：

- `ESBOOT_CONTENT_PATH`：指定要读取的路径
- `ESBOOT_CONTENT_PATTERN`：指定匹配模式
- `ESBOOT_CONTENT_IGNORE`：指定要忽略的页面

更多详情请参考[环境变量](./environment-variables)。

:::

## Page Metadata

入口文件支持一些配置，如页面 `title` 之类的。写法是在 `*.entry.{tsx,ts}` 中导出一个对象。

### 基本用法

```tsx
import React from 'react';

// 你的 React 代码
const HomePage = () => {
  return <div>Home Page</div>;
};

export default {
  title: '首页',
  // 其他配置...
};
```

### 支持的配置项

下面是支持的配置清单：

### title

页面标题，默认为 `文件名称 | ESBoot APP`。

**类型**：`string`

**示例**：

```tsx
export default {
  title: '首页',
};
```

### template

模板 HTML 地址。

**类型**：`string`

**默认值**：

- `SP` 模式：`config/template/index.html`
- `MP` 模式：`config/{platform}/template/index.html`

**说明**：配置不是一个完整的地址（目录是固定死的），只需要配置页面名称。

**示例**：

```tsx
export default {
  template: 'my-tpl',
};
```

此时的实际地址会是 `config/{platform}/template/my-tpl.html`。

### name

页面的唯一资源名称，默认是 `文件名称`。

**类型**：`string`

**示例**：

```tsx
// home.entry.tsx
export default {
  name: 'home',
};
```

:::note 注意事项

大部分情况可以不用填，使用默认值即可。

:::

### langJsonPicker

用于选择性地导入语言包中的特定部分，支持嵌套语法 `xx.xx.xx`。

**类型**：`string[]`

**默认值**：空（即导入全部）

**示例**：

```tsx
export default {
  langJsonPicker: ['common', 'home.title', 'home.description'],
};
```

更多详情请参考 [langJsonPicker](../config/#uselangjsonpicker)。

### urlParams

页面 URL 参数，默认是空。

**类型**：`string`

**说明**：如果填了会自动在 URL 中添加参数。

**示例**：

```tsx
// home.entry.tsx
export default {
  urlParams: '?a=1&b=2',
};
```

那么 `cfg.entry[chunk].url` 就是 `http://localhost:8001/home.html?a=1&b=2`。
