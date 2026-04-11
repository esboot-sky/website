---
sidebar_position: 1
---

# Introduction

## What Is ESBoot

`ESBoot` is an all-in-one frontend engineering toolkit that covers **development**, **testing**, **build**, **static checks**, **deployment**, **documentation**, and **best practices**. Its goal is to consolidate the engineering layer, improve developer experience and efficiency, and reduce long-term maintenance cost.

## Motivation

### Pain From Webpack Upgrades

The project started from the pain of upgrading legacy projects. Before ESBoot, each frontend project usually maintained its own engineering setup, which led to duplicated code, inconsistent conventions, and high maintenance overhead.

When Webpack 5 was released, many legacy projects needed to upgrade from Webpack 4, but the migration was difficult. Webpack configuration is already complex, and major-version upgrades make it worse. Different teams also had different custom patches scattered across projects, which made stability harder to guarantee. As a result, many projects simply gave up upgrading.

That means they could not benefit from the improvements brought by Webpack 5, and the engineering layer gradually became a burden that nobody wanted to touch.

### Inspiration From Better Frameworks

The ecosystem kept evolving. Early on, many teams used [CRA](https://create-react-app.dev/) to bootstrap projects. CRA hid much of the engineering complexity and made project creation easy, but upgrades still became the user's responsibility later.

Then meta-frameworks such as [Next.js](https://nextjs.org/) and [Umi](https://umijs.org/) became popular. They provide a more abstract configuration model, so developers can focus on higher-level options instead of low-level bundler details.

The most important improvement is upgradeability. For example, upgrading from Next.js 13 to 14 is usually just a dependency bump. The underlying build pipeline can evolve from Webpack 4 to Webpack 5, or from Babel to SWC, without forcing every application to rewrite its own setup.

### The Black Box Trade-off

Those frameworks are effectively black boxes: users rely on the framework's configuration surface instead of managing every underlying detail.

That is powerful, but it also means the available options are limited. For enterprises, a black box can feel opaque and hard to control.

That is why many companies end up building their own black boxes, and ESBoot is one of them.

## What ESBoot Provides

### Engineering Standardization

The core vision of ESBoot is to unify the engineering layer so frontend projects can feel as simple as running `next build`.

- **Smooth out bundler differences**: whether you know Webpack, Vite, or Rollup, the entry point stays approachable.
- **Focus on business logic**: application work should stay application-focused, not get dragged down by infrastructure complexity.
- **Upgrade more easily**: when the ecosystem moves forward, the engineering layer can evolve without forcing business code rewrites.

### Static Checks

ESBoot ships with production-tested best practices for `ESLint` and `Stylelint`.

- **Ready to use**: no need to assemble a long list of custom lint rules from scratch.
- **Consistent team style**: reduce style drift across contributors.
- **Quality guardrails**: built-in `husky` hooks keep the last mile of code quality in place.

### More Capabilities

ESBoot also handles more edge cases and wraps more practical tooling.

- **Plugin system**: extend functionality through plugins such as `vitest`, so testing can stay focused on tests instead of setup.
- **Bundler switching**: switch between `webpack`, `vite`, and `rspack` with minimal friction.
- **Documentation generation**: spin up documentation sites without dealing with low-level details.
- **Useful utilities**: built-in support for tools such as `tailwindcss` and `svgr`.

## Vision

The goal is simple: make frontend projects more stable and higher quality, while also making day-to-day development simpler, faster, and more enjoyable.

> Leave more time for the things that matter.
