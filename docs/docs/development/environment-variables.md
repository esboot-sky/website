---
sidebar_position: 1
---

# Environment Variables

## .env 文件

`.env` 文件用于设置项目编译时的环境变量，目前支持：

- **`.env`**：默认提交 Git，用于公用的环境变量
- **`.env.local`**：默认不提交 Git，用于自己本地开发时的环境变量，`.env.local` 中的变量会覆盖 `.env` 中的变量

:::tip 推荐工具

推荐使用 [ESBoot](../getting-started#esboot) 插件，可以快速切换环境变量。

:::

:::note 优先级

环境变量的优先级：`.env.local` > `.env`

:::

## 环境变量

### 平台相关

#### ESBOOT_PLATFORM

指定目标平台是 PC 端还是移动端。

**类型**：`string`

**可选值**：`pc | mobile`

**默认值**：`pc`

**示例**：

```env
ESBOOT_PLATFORM=mobile
```

#### ESBOOT_PAGE_TYPE

指定页面类型是浏览器端还是嵌入到客户端中。

**类型**：`string`

**可选值**：`browser | native`

**默认值**：`browser`

**示例**：

```env
ESBOOT_PAGE_TYPE=native
```

:::tip 组合使用

这两个环境变量通常组合使用，例如：

- `ESBOOT_PLATFORM=mobile` + `ESBOOT_PAGE_TYPE=browser` → 移动端浏览器
- `ESBOOT_PLATFORM=mobile` + `ESBOOT_PAGE_TYPE=native` → 移动端原生应用
- `ESBOOT_PLATFORM=pc` + `ESBOOT_PAGE_TYPE=browser` → PC 端浏览器
- `ESBOOT_PLATFORM=pc` + `ESBOOT_PAGE_TYPE=native` → PC 端原生应用

:::

### 内容匹配相关

#### ESBOOT_CONTENT_PATH

开发 MPA 的时候会区分模块，比如说交易、行情、个人中心等。每次全量启动会导致开发体验不好，所以可以在开发的时候设置只读取某个路径下的页面。

**类型**：`string`

**可选值**：路径地址

**说明**：基于根路径是 `./platforms/${ESBOOT_PLATFORM}/${ESBOOT_PAGE_TYPE}`。如果不写默认就是读取这个目录下的全量入口。

**示例**：

```env
ESBOOT_CONTENT_PATH=./modules/personal-center
```

#### ESBOOT_CONTENT_PATTERN

读取页面地址的正则匹配，用于筛选要启动的页面。

**类型**：`string`

**可选值**：正则表达式

**默认值**：`*`（代表匹配 `ESBOOT_CONTENT_PATH` 下所有的 `*.entry.{tsx,ts}`）

**示例**：

只运行 `trade.html`：

```env
ESBOOT_CONTENT_PATTERN=trade
```

运行 `trade.html` 和 `trade-setting.html`：

```env
ESBOOT_CONTENT_PATTERN=+(trade|trade-setting)
```

#### ESBOOT_CONTENT_IGNORE

忽略某些页面，不进行构建和启动。

**类型**：`string`

**可选值**：正则表达式，多个用 `,` 隔开

**示例**：

忽略 `trade.html` 和 `trade-setting.html`：

```env
ESBOOT_CONTENT_IGNORE=trade,trade-setting
```

使用通配符忽略所有以 `trade` 开头的页面：

```env
ESBOOT_CONTENT_IGNORE=trade*
```

:::tip 使用场景

这些环境变量在开发大型 MPA 项目时非常有用：

- **ESBOOT_CONTENT_PATH**：只启动特定模块，加快开发启动速度
- **ESBOOT_CONTENT_PATTERN**：只启动特定页面，用于调试单个页面
- **ESBOOT_CONTENT_IGNORE**：排除不需要的页面，减少构建时间

:::

### Mock 相关

#### BRIDGE_MOCK_HOST

bridge-mock 的监听主机地址。

**类型**：`string`

**可选值**：主机地址，如 `localhost`

**示例**：

```env
BRIDGE_MOCK_HOST=localhost
```

#### BRIDGE_MOCK_PORT

bridge-mock 的监听端口号。

**类型**：`number`

**可选值**：端口号，如 `3021`

**示例**：

```env
BRIDGE_MOCK_PORT=3021
```

:::note 关于 bridge-mock

bridge-mock 用于模拟原生客户端与 Web 页面的交互，更多详情请参考 [bridge-mock](http://asset.dzfe.net/ld/bridge-mock/#/)。

:::
