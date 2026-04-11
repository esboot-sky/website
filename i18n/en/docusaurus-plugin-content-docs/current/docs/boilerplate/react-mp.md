---
sidebar_position: 1
title: 01. React-MP
description: Boilerplate for React multi-platform project.
---

## Create Project

```sh
pnpm create esboot --upstream --url <your-project-git-url>
```

## Template Philosophy

This multi-platform template is designed to keep developers focused on their current page instead of repeatedly solving infrastructure bugs.

Key ideas:

- maximize cross-platform code reuse
- prefer `react-query`
- standardize request handling with `dz-axios`
- improve debugging efficiency
- keep projects synchronized with the upstream template through cherry-picking

## What This Template Solves

- standardized native/browser interaction wiring
- standardized user config shaping for different platforms
- helper layers for platform-specific integration points
- consistent network request instances and middleware patterns
- multi-level i18n structure for large MP projects

## Create Your Own Page

Run the page generator script from `package.json`:

```sh
pnpm create-page
```

## Request Layer

The template recommends:

- `dz-axios` for standardized request instances
- middleware-based auth and business-error handling
- `react-query` for caching, retry behavior, and view-layer simplicity

## Project Structure

The template contains:

- `config` for platform config
- `docs` for project docs
- `src` for source code
- `src/api` for backend API wrappers
- `src/platforms/*` for platform-specific resources
