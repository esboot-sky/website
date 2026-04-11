---
sidebar_position: 0
title: Basic
description: Basic boilerplate for ESBoot.
---

Most templates share the same technical foundations. The differences usually come from scenario-specific logic.

## Common Directory Naming

| Directory | Purpose |
| --- | --- |
| `constants` | constants such as API addresses and error codes |
| `hoc` | higher-order React components |
| `components` | reusable page components |
| `containers` | larger business-oriented containers |
| `utils` | pure functions |
| `helpers` | side-effectful helpers |
| `hooks` | custom hooks |
| `images` | image assets |
| `styles` | style files |
| `lang` | translation files |
| `modules` | page-level feature modules |

## components vs containers

- `components`: smaller, more reusable UI units
- `containers`: larger business sections or page-level building blocks

## utils vs helpers

- `utils`: no side effects, deterministic output
- `helpers`: may have side effects or depend on runtime state

## Fixed Convention Directories

### lang

All language files should live under `src/lang`.

### styles

All global CSS files should live under `src/styles`.
