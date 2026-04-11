---
sidebar_position: 8
title: Performance and Monitor
description: Performance and monitor development for ESBoot.
---

Performance work in ESBoot usually happens at three layers:

- **build-time performance**: bundler cache, chunking strategy, dependency splitting
- **runtime performance**: React rendering cost, large page hydration, asset weight
- **monitoring and diagnosis**: targeted tooling during development

For React applications, `@dz-web/esboot-browser-react` provides `monitorPerformance`, which integrates with `react-scan` to help inspect component rendering hotspots.

When performance tuning a project, start with:

- chunk strategy and shared dependency size
- asset size and SVG/image handling
- whether page-level `SSG` improves first-screen output
- whether platform-specific code is leaking into common bundles
