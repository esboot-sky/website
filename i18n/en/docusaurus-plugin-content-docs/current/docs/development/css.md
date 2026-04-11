---
sidebar_position: 3
title: CSS
description: CSS development for ESBoot.
---

## Language Support

ESBoot supports both [scss](https://sass-lang.com/) and standard [css](https://developer.mozilla.org/docs/Web/CSS), with built-in [CSS Modules](https://github.com/css-modules/css-modules) support.

SCSS is recommended because variables, nesting, and mixins make authoring easier.

## SCSS Variables vs CSS Variables

Projects can use both, but they behave differently:

- **SCSS variables** are resolved at build time and do not exist in final CSS output.
- **CSS variables** remain in runtime CSS and can be read or updated dynamically through JavaScript.

In most cases, CSS variables are the better long-term default because runtime theme switching becomes much easier.

## Style Processing Choices

ESBoot supports two main styling approaches:

- [Tailwind CSS](https://tailwindcss.com/)
- [CSS Modules](https://github.com/css-modules/css-modules)

## Tailwind CSS

ESBoot supports Tailwind CSS 4.x.

Why it is recommended:

- smaller generated CSS in many real-world cases
- no need to invent class names for everything
- strong AI and tooling support

### Entry File

ESBoot uses `src/styles/index.scss` as the default style entry. Add the ESBoot Tailwind entry like this:

```scss
@use '@dz-web/esboot-browser';
```

### Usage

```tsx
function App() {
  return (
    <div className="bg-red-500">
      <h1 className="text-2xl font-bold">Hello World</h1>
    </div>
  );
}
```

## CSS Modules

CSS Modules solve naming conflicts by scoping styles locally.

:::warning

This section is for `React` projects. In `Vue`, use regular `scoped` styles.

:::

### styleName

ESBoot supports both the standard `className={styles.foo}` pattern and the simplified `styleName` API.

```tsx
import './index.module.css';

<div styleName="container">
  <h1 styleName="title">Hello World</h1>
</div>
```

This is usually easier to read and works better with traditional CSS naming habits.

### Global vs Local Styles

Files inside `src/styles` are treated as global styles. Other CSS files are treated as local styles by convention.

You can still mix local and global styles with `:global` and `:local` when needed.
