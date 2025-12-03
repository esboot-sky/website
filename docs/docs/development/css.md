---
sidebar_position: 3
title: CSS
description: CSS development for ESBoot.
---

## 语言支持

ESBoot默认支持[scss](https://sass-lang.com/)和[css](https://developer.mozilla.org/zh-CN/docs/Web/CSS)，并且支持[css module](https://github.com/css-modules/css-modules)。

推荐使用scss，因为scss支持变量、嵌套、mixins等特性，可以提高开发效率。

## scss变量 和 css变量

项目中支持两种变量，但他们的运行机制完全不同。

- scss变量：在编译时解析，编译完成后变量会被它们的值所替代，不会出现在最终的CSS输出中。
- css变量：在运行时生效，作为CSS自定义属性保留在最终的CSS代码中，浏览器在渲染时动态解析

针对他们的特性，在你需要共享静态变量的时候可以使用`scss`变量，但是大部分情况还是推荐使用`css`变量，因为他可以在运行时动态切换，体验更佳，并且可以通过JavaScript的`getComputedStyle()`和`setProperty()`方法动态读取和修改。

## 样式处理

ESBoot支持两种CSS处理方式：

- [Tailwindcss](https://tailwindcss.com/)
- [CSS Modules](https://github.com/css-modules/css-modules)

## Tailwindcss

`Tailwindcss`是一个功能强大的CSS框架，支持快速构建现代化的UI。ESBoot支持`Tailwindcss`的4.x版本。**推荐使用`Tailwindcss`来构建样式**，因为：

- 原子化css代码体积更小。
- 不用去想所谓的类名，避免起名困扰。
- 现代化AI支持，可以更方便的CV代码。

### 入口文件

`ESBoot`默认了`src/styles/index.scss`作为入口样式文件，你必须在该文件中添加`Tailwindcss`的入口标记。因为`Tailwindcss`多个版本有不同的入口标记，所以`ESBoot`封装了入口，你只需要

*styles/index.scss*

```scss
@use '@dz-web/esboot-browser';
```

就可以放心使用`Tailwindcss`的类名了。

### 如何使用

```tsx
function App() {
  return (
    <div className="bg-red-500">
      <h1 className="text-2xl font-bold">Hello World</h1>
    </div>
  );
}
```

更多类名可以参考[Tailwindcss](https://tailwindcss.com/docs/class-reference)。

## CSS Modules

`CSS Modules`是css的另一种解决方案，用于解决css的命名冲突。

:::warning
请注意这里是`React`项目的`CSS Modules`，如果是`Vue`项目就正常使用`scoped`属性即可。
:::

### styleName属性

在正常的`React`项目中，我们会使用`className`属性来设置样式，并且通过下面的方式来使用`CSS Modules`。

*index.module.css*

```css
.container {
  background-color: red;
}

.title {
  font-size: 24px;
  font-weight: bold;
}
```

*index.tsx*

```tsx
import styles from './index.module.css';

<div className={styles.container}>
  <h1 className={styles.title}>Hello World</h1>
</div>
```

这样在`ESBoot`中也是可以正常使用的，但是用起来很不舒服。

- `styles.xxx`写法不直观。
- `styles.xxx`中的xxx要写成驼峰，如果要写短横线，要`style['xxx-xxx']`，非常不方便，不符合css模块的命名规范。

所以`ESBoot`提供了`styleName`属性来简化这个过程。

```tsx
import './index.module.css';

<div styleName="container">
  <h1 styleName="title">Hello World</h1>
</div>
```

这样写起来就非常直观了，和原始`class`的写法非常接近。

### 局部样式和全局样式

`ESBoot`约定`src/styles`目录下的所有文件都是全局样式，其他的都是局部样式，所以你不用起名为`index.module.css`，直接起名为`index.css`即可。

如果你想在局部样式文件里面使用全局样式，可以使用`:global`来包裹。

```css
.localClass {
  color: blue; /* This class will be locally scoped and hashed */
}

:global(.globalClass) {
  font-size: 20px; /* This class will remain global and not be hashed */
}

.wrapper :global(.button) {
  background-color: green; /* Combines local scoping for .wrapper with global .button */
}

:global {
  .globalClass {
    font-size: 20px; /* This class will remain global and not be hashed */
  }

  .button {
    background-color: green; /* Combines local scoping for .wrapper with global .button */
  }
}
```

你也可以使用`:local`来和`:global`搭配使用。

```css
:global {
  :local {
    .button {
      background-color: green; /* Combines local scoping for .wrapper with global .button */
    }
  }
}
```
