---
sidebar_position: 5
title: Error Handling
description: Error handling development for ESBoot.
---

ESBoot does not force a single application-level error-handling pattern, but it provides the building blocks needed for a reliable setup.

Typical recommendations:

- use a top-level React error boundary for rendering failures
- centralize runtime config access instead of reading unknown globals directly
- normalize request-layer business errors in one place
- keep platform-specific fallbacks isolated behind shared helpers

For React applications, the `@dz-web/esboot-browser-react` package exposes an `ErrorBoundary` component. See the API page for a complete example.
