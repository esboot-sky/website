---
sidebar_position: 0
---

# Platforms

`ESBoot`支持两种模式，`MP`和`SP`，可以通过[isSP](../config#issp)来切换。

- `MP`：是`multi platforms`的缩写，多平台的意思。
- `SP`：是`single platform`的缩写，单平台的意思。

## MP

`MP`模式多用于前端业务，比如当我们的页面需要同时放在多个平台下运行的情况。

目前默认支持4个平台。

- `pc-browser`：pc端浏览器
- `pc-native`：pc端嵌入式([cef](https://github.com/chromiumembedded/cef))
- `mobile-browser`：移动端浏览器
- `mobile-native`：移动端嵌入式(Webview)

基本目录为：

```plaint
# 配置根目录
config/
  ├── mobile
  │   ├── _browser
  │   │   └── config.js
  │   ├── _native
  │   │   └── config.js
  │   ├── bridge
  │   │   ├── bridge-mock-sample.js
  │   │   └── bridge-mock.js
  │   └── template
  │       └── index.html
  └── pc
      ├── _browser
      │   └── config.js
      ├── _native
      │   └── config.js
      ├── bridge
      │   ├── bridge-mock-sample.js
      │   └── bridge-mock.js
      └── template
          ├── disable-rem.html
          ├── index.html
          └── test-pc-flash-screen.html
# 多平台共用代码
src/helpers
  └── multi-platforms.ts
# 业务逻辑          
src/platforms/
  ├── mobile
  │   ├── _browser
  │   │   ├── helper
  │   │   │   └── multi-platforms.ts
  │   │   └── index.ts
  │   ├── _native
  │   │   ├── helper
  │   │   │   └── multi-platforms.ts
  │   │   └── index.ts
  ├── pc
  │   ├── _browser
  │   │   ├── helper
  │   │   │   └── multi-platforms.ts
  │   │   └── index.ts
  │   ├── _native
  │   │   ├── helper
  │   │   │   └── multi-platforms.ts
  │   │   └── index.ts
  └── .
```

`MP`的最大好处就是可以共用一份业务逻辑，然后根据不同的平台生成不同的代码。

一个合理的业务，在`mobile`和`pc`下，除了UI不一样，其他应该都是高度类似的。而在`browser`和`native`下，UI也是高度类似的，只是宿主环境不一样，所以只有交互方法不一样，其他都是一样的。

这样的特性就决定了四个平台，可以共用一份业务逻辑，两套UI。

### 我的代码该放在哪里？

`MP`模式下，目录是会很重复，并且链条很长，你可能会看到n个`helper`目录，所以很多人会纠结，我的代码该放在哪里？

这里提供一个原则，以`helper`举例：

- 如果你的`helper`是平台无关，也就是4个平台都可以使用，那么就放在`src/helpers/`下。
- 如果你的`helper`只在`pc`下使用，那么就放在`src/platforms/pc/helper/`下。
- 如果你的`helper`只在`mobile`下使用，那么就放在`src/platforms/mobile/helper/`下。
- 如果你的`helper`只能某一个宿主环境，比如`cef`中使用，那就放在`src/platforms/pc/_native/helper/`下。其他平台同理。

### 平台差异代码

虽说可以复用，但是还是有一些差异的，比如上面说的宿主环境不一样，我们交互的方法就不一样。

比如一个页面失去焦点的生命周期，在浏览器端需要监听`visibilitychange`，而在`native`端需要监听原生客户端提供生命周期。

但是我们的业务代码可能只有一份，所以ESboot提供了一个`multi-platforms.ts`，来让你在`MP`模式下，编写平台差异的代码。

举例有一个`sayHello`的方法，在`browser`端和`native`端的实现是不一样的，我们就可以在`multi-platforms.ts`中编写：

```typescript
// src/platforms/mobile/_browser/helper/multi-platforms.ts
export default {
  sayHello: (name: string) => {
    console.log(`Hello, ${name}`)
  }
}
```

```typescript
import { log } from 'native-helper';

// src/platforms/mobile/_native/helper/multi-platforms.ts
export default {
  sayHello: (name: string) => {
    log(`Hello, ${name}`)
  }
}
```

而在`src/helpers/multi-platforms.ts`中，固定会导出当前平台下的差异代码。

```typescript
// 📢 Do not manually modify, automatically generated by ESBoot.
export * from '@pc-native/helpers/multi-platforms';
```

所以我们在业务代码中可以这样使用

```ts
import { sayHello } from '@/helpers/multi-platforms';

sayHello('world');
```

这里的关键是，**固定只引用`@/helpers/multi-platforms`**，这样在编译时，就会根据当前的平台，自动生成对应的代码。

### Config目录

在`MP`模式下，`config`也比较复杂。4个平台，每个平台都有自己的`config`。但是还是遵循一个原则，就是从小到大，当前平台目录下的东西只能被当前平台使用。再往上就是共享配置，比如`config/mobile/`下的配置，就是`mobile`平台下所有宿主环境共享的配置。

#### config.js

```plaint
config/
  ├── mobile
  │   ├── _browser
  │   │   └── config.js
  │   ├── _native
  │   │   └── config.js
  └── pc
```

这里的`config.js`是配置文件，项目启动后会自动加载。在这里可以设置一些运行时的配置，比如页面中使用的接口地址等等。

#### bridge

`bridge`是给[bridge-mock](http://asset.dzfe.net/ld/bridge-mock/#/)使用的。

`config/mobile`和`config/pc`下的`bridge`目录是给`mobile`和`pc`平台使用的。

#### template

这是页面的模板目录，会根据这个目录下的文件，生成页面。参考[template配置](./entry-files#template)。

## SP

`SP`模式多用于中台/微信平台业务，比如当我们的页面只需要在一个平台(这个平台不只是非要`browser`，也可以是`native`)下运行的情况。

`SP`的目录就是普通项目的目录，`src`即是根目录。