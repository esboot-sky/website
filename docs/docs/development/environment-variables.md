---
sidebar_position: 1
---

# Environment Variables

ESBoot 支持通过 shell、CI 和 `.env` 文件设置运行时环境变量。已有的 `process.env` 使用方式保持不变。

## `.env` 文件

ESBoot 按以下顺序加载环境文件：

- **`.env`**：项目共享的基础变量，通常提交 Git。
- **`.env.${NODE_ENV}`**：当前模式变量，例如 `.env.development`、`.env.production` 或 `.env.test`。
- **`.env.local`**：本地覆盖变量，通常不提交 Git。

最终优先级为：

```text
shell / CI > .env.local > .env.${NODE_ENV} > .env
```

- shell 或 CI 中已经存在的变量不会被文件覆盖，包括显式空字符串。
- 当 `NODE_ENV` 未设置时，不会读取 `.env.undefined`。
- 不同 env 文件之间可以互相引用变量，展开时 shell/CI 值仍然具有最高优先级。
- 自定义变量会进入 ESBoot 的 Node 配置环境，但不会自动暴露到浏览器。需要在前端使用时，请通过 `.esbootrc.ts` 的 `define` 显式声明。

## 变量总览

### 核心运行变量

| 变量 | 可选值 / 类型 | 默认值 | 用途 |
| --- | --- | --- | --- |
| `NODE_ENV` | `development \| production \| test` | 由命令决定 | `esboot dev` 设置为 `development`，`esboot build` 设置为 `production`；同时决定 `.env.${NODE_ENV}`。 |
| `ESBOOT_PLATFORM` | `pc \| mobile` | `pc` | 选择多平台项目的目标平台。 |
| `ESBOOT_PAGE_TYPE` | `browser \| native` | `browser` | 选择浏览器页或客户端内嵌页。 |
| `ESBOOT_IS_CI_BUILD` | `0 \| 1` | `0` | `1` 表示 CI prepare，只执行 base 阶段；`0` 执行 base 与 local 阶段。 |
| `ESBOOT_CONTENT_PATH` | 路径字符串 | 空字符串 | 在内容根目录下进一步限定 entry 扫描路径。 |
| `ESBOOT_CONTENT_PATTERN` | glob pattern | `*` | 限定要扫描的 `*.entry.ts(x)` 文件名。 |
| `ESBOOT_CONTENT_IGNORE` | 逗号分隔的 pattern | 空字符串 | 排除指定 entry，例如 `trade,trade-setting`。 |
| `ESBOOT_ESLINT_PROJECT_SERVICE` | `0 \| 1` | `1` | `1` 开启 TypeScript Project Service；`0` 使用快速、非 project-service ESLint。 |
| `ESBOOT_PREPARE_DEBUG` | `0 \| 1` | `0` | `1` 输出 prepare task 的 stage、名称与执行顺序。 |

### 构建、分析与 Mock

| 变量 | 类型 | 默认值 | 用途 |
| --- | --- | --- | --- |
| `ANALYZE_PORT` | 端口字符串/数字 | `8101` | Webpack production analyze server 端口。 |
| `BUILD_VERSION` | 字符串 | 当前项目 `package.json` version | 覆盖注入 `config.js` URL 的版本查询参数。 |
| `BRIDGE_MOCK_HOST` | 主机名或 IP | 当前 ESBoot IPv4 地址 | native dev 页面注入的 bridge mock host。 |
| `BRIDGE_MOCK_PORT` | 端口字符串/数字 | `3000` | native dev 页面注入的 bridge mock port。 |
| `DEBUG` | 推荐使用 `true \| false` | 未设置 | `true` 开启 ESBoot debug 判断；非空值也会开启底层 debug logger。 |

### 工具与项目约定

| 变量 | 可选值 / 类型 | 默认值 | 用途 |
| --- | --- | --- | --- |
| `ESBOOT_BUNDLER` | `vite \| webpack \| rspack` | 示例同步脚本中为 `webpack` | ESBoot examples 与 create-esboot 模板用于切换 `.esbootrc.ts`/bundler 配置的约定变量；不是核心 CLI 自动选择器。 |

### ESBoot 自动维护的内部变量

这些变量通常不需要用户手动设置，但属于 ESBoot 当前运行时协议的一部分：

| 变量 | 维护方 | 说明 |
| --- | --- | --- |
| `BROWSERSLIST_ENV` | common config | MP production 自动设置为 `${ESBOOT_PLATFORM}-${ESBOOT_PAGE_TYPE}-production`。 |
| `VITEST` | Vitest / plugin-vitest | plugin-vitest 判断是否在 ESBoot 仓库自身测试环境中运行。 |
| `APP_ROOT` | plugin-docs | Docs 命令自动设置为 `./docs`。 |
| `DUMI_THEME` | plugin-docs | Docs 命令自动设置 Dumi theme 包路径。 |
| `port` | plugin-docs | 传入 Docs `--port` 时同步保存的内部变量；变量名区分大小写。 |

## 平台组合

`ESBOOT_PLATFORM` 与 `ESBOOT_PAGE_TYPE` 通常组合使用：

| 配置 | 目标 |
| --- | --- |
| `mobile + browser` | 移动端浏览器页面 |
| `mobile + native` | 移动端客户端内嵌页面 |
| `pc + browser` | PC 浏览器页面 |
| `pc + native` | PC 客户端内嵌页面 |

```env
ESBOOT_PLATFORM=mobile
ESBOOT_PAGE_TYPE=native
```

## Entry 扫描示例 {#esboot_content_path}

只扫描 personal-center 模块中的 trade 与 trade-setting 页面，并忽略 trade-setting：

```env
ESBOOT_CONTENT_PATH=modules/personal-center
ESBOOT_CONTENT_PATTERN=+(trade|trade-setting)
ESBOOT_CONTENT_IGNORE=trade-setting
```

`ESBOOT_CONTENT_PATH` 基于当前内容根目录：

```text
SP: <cwd>/src
MP: <cwd>/src/platforms/${ESBOOT_PLATFORM}/_${ESBOOT_PAGE_TYPE}
```

## ESLint Project Service 分层

推荐按运行场景使用：

| 场景 | 配置 | 说明 |
| --- | --- | --- |
| VSCode ESLint / 普通 ESLint | 未设置或 `1` | 开启 type-aware Project Service。 |
| lint-staged / pre-commit | 自动传入 `0` | ESBoot 自动使用快速配置，无需项目手动设置。 |
| CI 完整检查 | 未设置或显式 `1` | 开启 Project Service，执行完整检查。 |

Project Service 只接受属于 TypeScript project 的文件。如果需要 lint `.esbootrc.ts`、`playwright.config.ts` 等配置文件，必须将它们加入项目 tsconfig：

```json
{
  "include": [
    ".esbootrc.ts",
    "src/**/*",
    "playwright.config.ts"
  ]
}
```

也可以由 ESBoot 插件通过 `modifyTypescriptConfig` 合并 include，避免每个项目重复维护生成配置。
