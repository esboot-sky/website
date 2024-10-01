---
sidebar_position: 1
---

# CLI

要获取可用的命令列表，你可以在项目目录中运行 help 命令：

```bash
$ esboot help

# 你应该能看到类似如下的日志：

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

如何还想查看具体命令的配置，可以继续执行

```bash
$ esboot help preview

Usage: esboot preview [options]

Preview Projects

Options:
  -p, --port <char>
  -d, --directory <char>
  -h, --help              display help for command
```

## dev

启动本地开发服务器，进行项目的开发与调试。

```bash
$ esboot dev
...
```

## build

构建项目，适用于生产环境的部署。

```bash
$ esboot build
...
```

## preview

`preview`命令会在本地启动一个静态 Web 服务器，将 dist 文件夹运行在 `http://127.0.0.1:8900`, 用于预览构建后产物。

```bash
$ esboot preview

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

## lint

lint命令用于检查及修正代码是否符合规则。目前包含了eslint校验和stylelint校验。

```bash
$ esboot lint
...
```

## prepare

执行初始化操作，主要会做两件事情，

- 生成eslint、stylelint配置文件
- 初始化husky

```sh
$ esboot prepare

info  - Created Typescript Config: ~/sp-base/node_modules/.cache/esboot/typescript/tsconfig.json.
info  - Created Stylelint Config: ~/sp-base/node_modules/.cache/esboot/stylelint/index.js.
info  - Created Prettier Config: ~/sp-base/node_modules/.cache/esboot/prettier/index.json.
info  - Created ESLint Config: ~/sp-base/node_modules/.cache/esboot/eslint/index.js.
info  - Created Commitlint Config: ~/sp-base/node_modules/.cache/esboot/commitlint/index.js.
info  - Created Type File: ~/sp-base/node_modules/.cache/esboot/typescript/esboot.d.ts.
Done!

husky - Git hooks installed
```

## docs

生成项目文档。

### `docs dev`

```sh
$ esboot docs dev
...
```

启动本地开发服务器，进行项目的开发与调试。

### `docs build`

```sh
$ esboot docs build
...
```

构建文档产物，适用于生产环境的部署。

### `docs preview`

```sh
$ esboot docs preview
...
```

在本地启动一个静态 Web 服务器，运行在 `http://127.0.0.1:4172`, 用于预览构建后产物。

可以通过 `--port` 参数来配置服务的运行端口。

```bash
esboot docs preview --port 9527
```

现在 `preview` 命令会将服务器运行在 `http://127.0.0.1:9527`

## Mock Series

生成一些应用的mock数据。

### mock\:bridge

配合[bridge-mock](http://asset.web.dz/ld/bridge-mock/#/)，启动mock服务。

```sh
$ esboot mock:bridge

/Users/My/esboot-react-mp/config/mobile/bridge/bridge-mock.js 加载成功
正在监听 *:3002, admin控制台访问地址： http://localhost:3002?port=3002
```
