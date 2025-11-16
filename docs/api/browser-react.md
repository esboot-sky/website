---
sidebar_position: 5
title: Browser React
---

# Introduction

`@dz-web/esboot-browser-react` 是 `ESBoot` 的浏览器端工具集，提供了与react的集成。

## Installation

```sh
pnpm install @dz-web/esboot-browser-react
```

## AOP

### monitorPerformance

监控组件的性能，内置使用[react-scan](https://react-scan.com/)进行性能监控。

```ts
interface MonitorPerformanceOptions {
  enabledReactScan?: boolean;
  showToolbar?: boolean;
  showFPS?: boolean;
}

export async function monitorPerformance(
  options?: MonitorPerformanceOptions
): Promise<void>;
```

#### 参数

- `options`：可选的配置对象。
  - `enabledReactScan`：是否启用 react-scan 性能监控。默认为 `true`。
  - `showToolbar`：是否显示工具栏。默认为 `true`。
  - `showFPS`：是否显示 FPS 信息。默认为 `true`。

#### 示例

基本使用：

```ts
import { monitorPerformance } from '@dz-web/esboot-browser-react';

monitorPerformance();
```

自定义配置：

```ts
import { monitorPerformance } from '@dz-web/esboot-browser-react';

monitorPerformance({
  enabledReactScan: true,
  showToolbar: true,
  showFPS: false,
});
```

禁用性能监控：

```ts
import { monitorPerformance } from '@dz-web/esboot-browser-react';

monitorPerformance({
  enabledReactScan: false,
});
```

## Components

### ErrorBoundary

React 错误边界组件，用于捕获子组件树中的 JavaScript 错误，记录错误信息，并显示降级 UI。基于 [react-error-boundary](https://github.com/bvaughn/react-error-boundary) 封装。

```ts
interface ErrorBoundarySharedProps {
  onError?: (error: Error, info: ErrorInfo) => void;
  onReset?: (details: {
    reason: 'imperative-api';
    args: any[];
  } | {
    reason: 'keys';
    prev: any[] | undefined;
    next: any[] | undefined;
  }) => void;
}

interface ErrorBoundaryPropsByESBoot extends ErrorBoundarySharedProps, PropsWithChildren {
  fallbackRender?: (props: FallbackProps) => ReactNode;
}

function ErrorBoundary(props: ErrorBoundaryPropsByESBoot): ReactNode;
```

#### 参数

- `children`：需要被错误边界包裹的子组件。
- `onError`：可选的错误回调函数。当子组件抛出错误时会被调用。
  - `error`：捕获到的错误对象。
  - `info`：包含组件堆栈跟踪信息的错误信息对象。
- `onReset`：可选的重置回调函数。当错误边界被重置时会被调用。
  - `details.reason`：重置原因，可能的值：
    - `'imperative-api'`：通过命令式 API 调用重置。
    - `'keys'`：由于 key 变化导致的重置。
  - `details.args`：当 `reason` 为 `'imperative-api'` 时，包含传递给重置函数的参数。
  - `details.prev`：当 `reason` 为 `'keys'` 时，包含之前的 key 数组。
  - `details.next`：当 `reason` 为 `'keys'` 时，包含新的 key 数组。
- `fallbackRender`：可选的自定义降级 UI 渲染函数。如果不提供，将使用默认的降级 UI。
  - `props`：包含 `error`、`resetErrorBoundary` 等属性的对象。

#### 示例

基本使用：

```tsx
import { ErrorBoundary } from '@dz-web/esboot-browser-react';

function App() {
  return (
    <ErrorBoundary>
      <YourComponent />
    </ErrorBoundary>
  );
}
```

自定义错误处理：

```tsx
import { ErrorBoundary } from '@dz-web/esboot-browser-react';

function App() {
  return (
    <ErrorBoundary
      onError={(error, info) => {
        console.error('Error caught:', error);
        console.error('Error info:', info);
      }}
    >
      <YourComponent />
    </ErrorBoundary>
  );
}
```

自定义降级 UI：

```tsx
import { ErrorBoundary } from '@dz-web/esboot-browser-react';
import type { FallbackProps } from 'react-error-boundary';

function CustomFallback({ error, resetErrorBoundary }: FallbackProps) {
  return (
    <div role="alert">
      <h2>出错了</h2>
      <pre>{error.message}</pre>
      <button onClick={resetErrorBoundary}>重试</button>
    </div>
  );
}

function App() {
  return (
    <ErrorBoundary fallbackRender={CustomFallback}>
      <YourComponent />
    </ErrorBoundary>
  );
}
```

完整示例（包含错误处理和重置回调）：

```tsx
import { ErrorBoundary } from '@dz-web/esboot-browser-react';
import type { FallbackProps } from 'react-error-boundary';

function CustomFallback({ error, resetErrorBoundary }: FallbackProps) {
  return (
    <div role="alert">
      <h2>出错了</h2>
      <pre>{error.message}</pre>
      <button onClick={resetErrorBoundary}>重试</button>
    </div>
  );
}

function App() {
  return (
    <ErrorBoundary
      fallbackRender={CustomFallback}
      onError={(error, info) => {
        console.error('Error caught:', error);
        console.error('Component stack:', info.componentStack);
      }}
      onReset={(details) => {
        console.log('Error boundary reset:', details);
      }}
    >
      <YourComponent />
    </ErrorBoundary>
  );
}
```
