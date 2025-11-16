---
sidebar_position: 1
---

# CLI

要获取可用的命令列表，你可以在项目目录中运行 help 命令：

```sh
esboot help
```

你应该能看到类似如下的输出：

```sh
Usage: esboot [options] [command]

Options:
  -V, --version             output the version number
  -h, --help                display help for command

Commands:
  dev                       Start to develop project
  build                     Build project
  prepare                   Prepare esboot project
  lint                      Lint project files using ESLint and
                            Stylelint
  preview                   Preview the distribution content
  mock:bridge [options]     Start bridge mock
  exec_git_hooks [options]  Execute git hooks
  help [command]            display help for command
```

如果还想查看具体命令的配置，可以继续执行：

```sh
esboot help preview
```

输出示例：

```sh
Usage: esboot preview [options]

Preview Projects

Options:
  -p, --port <char>
  -d, --directory <char>
  -h, --help              display help for command
```

## dev

启动本地开发服务器，进行项目的开发与调试。

```sh
esboot dev
```

:::tip 使用场景

- 本地开发调试
- 热更新开发
- 代码实时预览

:::

## build

构建项目，生成生产环境的部署文件。

```sh
esboot build
```

:::tip 使用场景

- 生产环境部署
- 代码优化和压缩
- 生成静态资源

:::

构建产物默认输出到 `dist` 目录（可通过配置修改）。

## preview

`preview` 命令会在本地启动一个静态 Web 服务器，将 `dist` 文件夹运行在 `http://127.0.0.1:8900`，用于预览构建后产物。

### 基本用法

```sh
esboot preview
```

### 参数选项

| 参数 | 说明 | 默认值 |
| --- | --- | --- |
| `-p, --port <port>` | 指定服务器端口 | `8900` |
| `-d, --directory <dir>` | 指定要预览的目录 | `dist` |
| `-h, --help` | 显示帮助信息 | - |

### 使用示例

```sh
# 使用默认端口 8900
esboot preview

# 指定端口
esboot preview --port 3000

# 指定预览目录
esboot preview --directory dist
```

### 输出示例

```sh
Starting up http-server, serving dist

http-server version: 14.1.1

http-server settings: 
CORS: disabled
Cache: 1 seconds
Connection Timeout: 120 seconds
Directory Listings: visible
AutoIndex: visible
Serve GZIP Files: false
Serve Brotli Files: false
Default File Extension: none

Available on:
  http://127.0.0.1:8900
  http://10.10.11.247:8900
  http://198.18.0.1:8900
```

:::tip 使用场景

- 预览构建后的生产版本
- 测试生产环境配置
- 验证构建产物是否正确

:::

## lint

`lint` 命令用于检查及修正代码是否符合规则。目前包含了 ESLint 校验和 Stylelint 校验。

```sh
esboot lint
```

:::tip 功能说明

- **ESLint**：检查 JavaScript/TypeScript 代码规范
- **Stylelint**：检查 CSS/SCSS 样式代码规范
- 自动修复可修复的问题

:::

:::note 注意事项

运行 `lint` 命令前，确保已经执行过 `esboot prepare` 命令生成配置文件。

:::

## prepare

执行初始化操作，主要会做两件事情：

- 生成 ESLint、Stylelint、Prettier、Commitlint、TypeScript 等配置文件
- 初始化 Husky Git hooks

```sh
esboot prepare
```

### prepare 输出示例

```sh
info  - Created Typescript Config: ~/sp-base/node_modules/.cache/esboot/typescript/tsconfig.json.
info  - Created Stylelint Config: ~/sp-base/node_modules/.cache/esboot/stylelint/index.js.
info  - Created Prettier Config: ~/sp-base/node_modules/.cache/esboot/prettier/index.json.
info  - Created ESLint Config: ~/sp-base/node_modules/.cache/esboot/eslint/index.js.
info  - Created Commitlint Config: ~/sp-base/node_modules/.cache/esboot/commitlint/index.js.
info  - Created Type File: ~/sp-base/node_modules/.cache/esboot/typescript/esboot.d.ts.
Done!

husky - Git hooks installed
```

:::important 重要提示

- 首次使用项目时，必须先执行 `esboot prepare` 命令
- 配置文件会生成在 `node_modules/.cache/esboot/` 目录下
- 执行后会初始化 Git hooks，用于代码提交前的检查

:::

## docs

生成项目文档。基于 `docs` 目录，支持 MDX 格式。

### docs dev

启动本地开发服务器，进行文档的开发与调试。

```sh
esboot docs dev
```

### docs build

构建文档产物，适用于生产环境的部署。

```sh
esboot docs build
```

### docs preview

在本地启动一个静态 Web 服务器，运行在 `http://127.0.0.1:4172`，用于预览构建后的文档产物。

```sh
esboot docs preview
```

#### docs preview 参数选项

可以通过 `--port` 参数来配置服务的运行端口：

```sh
esboot docs preview --port 9527
```

现在 `preview` 命令会将服务器运行在 `http://127.0.0.1:9527`。

:::tip 使用场景

- **docs dev**：开发文档时使用，支持热更新
- **docs build**：构建文档用于部署
- **docs preview**：预览构建后的文档效果

:::

## Mock Series

生成一些应用的 mock 数据。

### mock:bridge

配合 [bridge-mock](http://asset.web.dz/ld/bridge-mock/#/)，启动 mock 服务。

```sh
esboot mock:bridge
```

### mock:bridge 输出示例

```sh
/Users/My/esboot-react-mp/config/mobile/bridge/bridge-mock.js 加载成功
正在监听 *:3002, admin控制台访问地址： http://localhost:3002?port=3002
```

:::tip 使用说明

- Mock 服务默认运行在 `3002` 端口
- Admin 控制台访问地址：`http://localhost:3002?port=3002`
- Mock 配置文件位于 `config/{platform}/bridge/bridge-mock.js`

:::

:::note 注意事项

- 需要先配置 `bridge-mock.js` 文件
- 支持 MP 模式下的多平台配置
- 用于模拟原生客户端与 Web 页面的交互

:::
