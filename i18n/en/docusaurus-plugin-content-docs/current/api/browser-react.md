---
sidebar_position: 5
title: Browser React
---

`@dz-web/esboot-browser-react` provides React-focused browser utilities for ESBoot.

## Installation

```sh
pnpm install @dz-web/esboot-browser-react
```

## AOP

### monitorPerformance

Monitors component performance through built-in `react-scan` integration.

```ts
interface MonitorPerformanceOptions {
  enabledReactScan?: boolean;
  showToolbar?: boolean;
  showFPS?: boolean;
}
```

## Components

### ErrorBoundary

React error boundary wrapper built on top of [react-error-boundary](https://github.com/bvaughn/react-error-boundary).

It can:

- catch rendering errors from child trees
- trigger `onError`
- trigger `onReset`
- render a custom `fallbackRender`

Typical usage:

```tsx
import { ErrorBoundary } from '@dz-web/esboot-browser-react';

<ErrorBoundary>
  <YourComponent />
</ErrorBoundary>
```
