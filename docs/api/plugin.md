---
sidebar_position: 2
title: Plugin
---

# Plugin

ESBoot 的插件系统用于在配置加载、命令注册、prepare 阶段和 bundler 构建阶段注入自定义能力。

当前模型已经从“固定 hook 名称 + 全局收集器”升级为“命名插件 + 执行上下文 + 条件启用 + 顺序控制”的结构，更接近 Vite / Rollup 的设计方式。

## 快速开始

```ts
import { defineConfig, definePlugin, PluginHooks } from "@dz-web/esboot";

export default defineConfig({
  plugins: [
    definePlugin({
      name: "demo-plugin",
      enforce: "pre",
      apply: "dev",
      [PluginHooks.modifyConfig]: (config, ctx) => {
        ctx.logger.info("running in", ctx.command);

        return {
          define: {
            ...config.define,
            "process.env.plugin": "demo",
          },
        };
      },
    }),
  ],
});
```

## Plugin 对象

### `name`

插件唯一名称。新模型推荐始终使用 `name`，它会被用于：

- 插件识别
- 顺序调试
- 未来的依赖和冲突提示

`key` 仍然兼容旧插件，但只建议作为迁移期过渡字段。

### `enforce`

控制执行顺序：

- `pre`：先执行
- `post`：后执行
- 未设置：普通顺序

同一层级内按配置顺序执行。

### `apply`

决定插件是否在当前场景生效。

可用值：

- `true`
- `false`
- `'always'`
- `'never'`
- `'dev'`
- `'build'`
- `'prepare'`
- `'preview'`
- `(ctx) => boolean`

推荐优先使用字符串场景值；当判断条件更复杂时，再用函数形式。

### `onActivated`

在插件被装载并通过 `apply` 判断后触发，常用于：

- 初始化状态
- 输出调试日志
- 提前读取当前环境信息

## Runtime Context

插件回调会收到一个统一的上下文对象 `ctx`，包含：

- `cfg`：当前 ESBoot 配置
- `command`：当前命令
- `bundler`：当前 bundler 名称
- `env`：当前环境
- `logger`：插件日志工具

这让插件更少依赖外部全局状态，尤其适合做：

- 只在 `dev` 下启用的能力
- 只对某个 bundler 生效的配置
- 需要记录调试日志的场景

## Hook 参考

### `modifyConfig`

用于修改 ESBoot 主配置，适合：

- 增加 alias
- 开关能力
- 调整 CSS / Tailwind / SVGR 等全局选项

返回 patch 对象即可，框架会负责合并。

### `registerCommands`

用于向 CLI 注册命令。

建议把命令创建逻辑保持轻量，命令执行时再做重操作，比如启动子进程、读取文件或拉起开发服务器。

返回值是一个 `Command[]`，其中每个命令支持：

- `name`
- `description`
- `arguments`
- `allowUnknownOption`
- `passThroughOptions`
- `options`
- `action`

### `modifyTypescriptConfig`

用于调整准备阶段生成的 TypeScript 配置。

适合补充：

- `compilerOptions.paths`
- `include`
- `exclude`

### `modifyPrettierConfig`

用于调整生成的 Prettier 配置。

### `modifyStylelintConfig`

用于调整生成的 Stylelint 配置。

### `modifyEslintConfig`

用于调整生成的 ESLint 配置。

### `modifyBundlerConfig`

用于修改 bundler 原始配置。

回调会拿到：

- `cfg`：ESBoot 配置
- `bundlerConfig`：当前 bundler 配置对象
- `bundlerName`：`vite` / `webpack` / `rspack`
- `ctx`：插件上下文

适合做 bundler 级能力，例如：

- 增删 bundler 插件
- 修改 `splitChunks` / `manualChunks`
- 调整构建插件顺序

### `prepare`

用于 `esboot prepare` 阶段。

适合生成文件、写缓存、复制模板和初始化外部工具配置。

### `afterCompile`

用于构建或开发完成后的收尾处理。

适合：

- 打印结果
- 上报构建信息
- 记录产物路径

## 最佳实践

- 给每个插件一个清晰、稳定的 `name`
- 用 `enforce` 表达顺序，不要依赖数组位置去“碰运气”
- 用 `apply` 限定插件的生效场景
- 优先返回 patch，不要直接修改复杂对象的深层结构，除非 hook 明确就是为此设计的
- 把 bundler 特化逻辑留在 `modifyBundlerConfig`
- 尽量让插件无副作用，副作用只放在 `prepare`、`registerCommands` 和 `afterCompile`

## 从 `key` 迁移

旧写法：

```ts
definePlugin({
  key: "legacy-plugin",
});
```

新写法：

```ts
definePlugin({
  name: "legacy-plugin",
});
```

如果你还在维护已有插件，`key` 现在仍然可用，但新插件建议直接使用 `name`。

## 示例

```ts
import { definePlugin, PluginHooks } from "@dz-web/esboot";

export default function myPlugin() {
  return definePlugin({
    name: "my-plugin",
    enforce: "pre",
    apply: ({ command }) => command === "build",
    [PluginHooks.modifyConfig]: (config, ctx) => {
      ctx.logger.info("patch config for", ctx.command);

      return {
        sourceMap: false,
      };
    },
    [PluginHooks.prepare]: (_cfg, ctx) => {
      ctx.logger.info("prepare under", ctx.command);
    },
  });
}
```

## 相关文档

- [Changelog](../docs/changelog.md)
- [Plugins Guide](../docs/plugins/dev.md)
