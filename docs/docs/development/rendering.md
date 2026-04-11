---
sidebar_position: 1
---

# Rendering

`ESBoot` 现在已经支持基于入口文件声明页面渲染方式，并且会沿着同一套入口协议继续扩展 `SSR` 能力。

当前可以落地的是：

- `SSG`：构建时或开发时生成首屏 HTML

后续计划补齐的是：

- `SSR`：请求到来时在服务端动态渲染页面

## Why

把渲染能力放在入口文件层声明，有几个好处：

- 页面级能力更明确，哪些页面需要预渲染一眼可见
- 可以和现有的 `title`、`template`、`langJsonPicker` 等入口元信息放在一起管理
- 后面从 `SSG` 继续扩展到 `SSR` 时，不需要推翻入口协议

## Rendering Modes

| Mode | HTML 生成时机 | 首屏速度 | 是否适合交互 | 是否依赖服务端请求上下文 | 当前状态 |
| --- | --- | --- | --- | --- | --- |
| `CSR` | 浏览器端运行后生成 | 一般 | 是 | 否 | 已支持 |
| `SSG` | build/dev 阶段预生成 | 快 | 是，可选 hydrate | 否 | 已支持 |
| `SSR` | 每次请求到来时生成 | 快 | 是 | 是 | 规划中 |

你可以简单这样理解：

- `CSR`：浏览器拿到页面后自己渲染
- `SSG`：先把首屏 HTML 提前准备好，再决定是否 hydrate
- `SSR`：根据当前请求动态生成首屏 HTML

## SSG

`SSG`（Static Site Generation）适合这些场景：

- 文档页、说明页、活动页、营销页
- 首屏内容比较稳定，希望提前生成 HTML
- 页面首屏希望更快展示，减少客户端首次渲染压力

### 基本配置

入口文件支持导出 `ssg` 字段：

```ts
{
  enable?: boolean;
  hydrate?: boolean;
  render: () => unknown | Promise<unknown>;
}
```

配置项说明：

- `enable`：是否开启当前页面的 `SSG`
- `hydrate`：是否在浏览器中继续 hydrate，默认是 `true`
- `render`：用于生成首屏 HTML 的渲染函数

### SSG + Hydrate

这是最常见的模式：首屏 HTML 由 `SSG` 生成，浏览器加载后再由 React 接管。

```tsx
import { mountReactApp } from '@dz-web/esboot-browser-react';
import Page from './page';

const app = <Page />;

if (typeof document !== 'undefined' && document.getElementById('root')) {
  mountReactApp(app, {
    hydrate: true,
  });
}

export default {
  title: 'SSG Demo',
  ssg: {
    enable: true,
    hydrate: true,
    render: () => app,
  },
};
```

行为如下：

- `build` 时会把 `render()` 的结果注入到最终 HTML 中
- `dev` 时访问这个页面，也会先返回预渲染后的首屏内容
- 浏览器端脚本加载后，会继续 hydrate 当前页面

这种模式适合首屏想快、后面又需要交互的页面。

### 纯静态 SSG

如果页面不需要任何客户端交互，可以把 `hydrate` 关闭：

```tsx
export default {
  title: 'Static SSG Page',
  ssg: {
    enable: true,
    hydrate: false,
    render: () => '<main>hello static page</main>',
  },
};
```

行为如下：

- 页面会作为纯静态 HTML 输出
- 最终 HTML 中会移除当前页面的模块脚本和 `modulepreload`

这种模式适合真正的静态内容页。

### definePage

如果你想显式获得类型提示，也可以使用 `definePage`：

```tsx
import { definePage } from '@dz-web/esboot';

export default definePage({
  title: 'SSG Demo',
  ssg: {
    enable: true,
    render: () => '<div>hello ssg</div>',
  },
});
```

### 注意事项

- `render()` 中尽量不要直接依赖 `document`、`window` 之类的浏览器对象
- 如果页面需要 hydrate，客户端挂载结构要和 `render()` 的输出保持一致
- 推荐把页面主体抽成独立组件，在入口里同时复用给 `render()` 和客户端挂载

:::tip 当前支持情况

目前 `SSG` 先支持 `Vite bundler`。

:::

## SSR

`SSR`（Server-Side Rendering）和 `SSG` 的核心区别是：`SSG` 在构建阶段生成 HTML，而 `SSR` 会在每次请求到来时生成 HTML。

这意味着 `SSR` 更适合：

- 首屏依赖请求时数据的页面
- 同一个页面需要根据 URL、Cookie、Header、用户身份返回不同内容
- 需要服务端数据预取的场景

## SSR 规划能力

虽然当前先落地的是 `SSG`，但整体入口设计已经在为后面的 `SSR` 预留扩展空间。后续 `SSR` 预计会围绕下面几类能力展开：

### 请求期渲染

页面不再只在 build 阶段生成 HTML，而是在请求到来时按当前请求上下文执行渲染。

典型能力包括：

- 获取当前 URL、query、params
- 读取请求头、Cookie、用户态信息
- 针对不同请求返回不同首屏 HTML

### 数据预取

后续 `SSR` 会需要更标准的数据获取约定，例如：

- 页面级服务端数据预取
- 把服务端拿到的数据注入到客户端
- 避免客户端 hydrate 后再次重复请求首屏关键数据

### 流式渲染

当页面比较重、模块比较大或者依赖异步数据时，后续也可以继续扩展到流式输出，提升首字节和可感知渲染速度。

### 与 SSG 共用入口协议

后续 `SSR` 会尽量复用现在的入口文件思路，而不是另起一套完全不同的协议。也就是说：

- 页面级渲染能力仍然会在入口里声明
- `SSG` 和 `SSR` 会尽量共享元信息、模板和页面定义方式
- 当前的 `SSG` 入口结构会尽量成为后面完整渲染体系的一部分

## 推荐理解方式

可以先把这条演进路径理解成：

1. 先用入口文件声明页面元信息
2. 再通过 `ssg` 为部分页面开启构建期首屏渲染
3. 后续继续扩展到请求期的 `SSR`
4. 最终让静态页、半静态页、动态渲染页都能用统一的入口心智来管理

这样做的目标不是只给文档站或营销页提供渲染能力，而是为整个 `ESBoot` 的页面输出模型打一个可以持续扩展的基础。
