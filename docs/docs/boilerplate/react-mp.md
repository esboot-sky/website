---
sidebar_position: 1
title: 01. React-MP
description: Boilerplate for React multi-platform project.
---

## Create Project

```sh
pnpm create esboot --upstream --url 你的项目git地址

# Example
pnpm create esboot --upstream --url ssh://git@git.web.dz:10022/draft/esboot-react-mp-draft.git
```

## 模板工程开发理念

* 让开发重新关注自己正在开发的页面而不是别人写的bug
* 多端复用代码
* react-query优先
* 标准化网络请求(dz-axios)
* 提升开发调试效率
* 保持项目与模板工程迭代的同步

## 模板工程解决的问题

本模板项目主要解决公司前端开发中遇到的常见问题，让开发尽量只关注自己正在开发的页面，页面之外的代码标准化, 统一由模板工程维护，通过git cherry-pick选择性更新到自己的项目中。

### app交互配置、浏览器端配置标准化

业务代码中只需要从redux中读取配置。注意需要对接一次原生交互，在pc或mobile中的customize.ts文件在根据项目不同，定义好当前交互的类型，进行一次数据转换，转换为redux中的标准配置, 还需要在相应端的msg.ts中修改getUserConfig, getUserInfo方法，默认适配了中信(中信、光证)手机、pc客户端。
手机端的页面，不需要关心运行在哪个端，如果没有依赖app交互，是可以同时运行在原生、浏览器中的。原生交互隔离，可使用原有的multi-platforms.ts提供不同平台相同名字的api

## 创建自己页面

运行package.json中的create-page命令，根据提示回答问题，即可创建自己的页面。

```shell
pnpm create-page
```

## 原生app内嵌页面交互与纯浏览器访问页面

参考esboot在.env中打包出不同端的页面即可, 为避免隐藏bug过多，要严格区分原生端、浏览器端，不可共用同一个包部署。

## 状态管理

每个页面，都带有一个如下图的标准化userConfig，pc端、手机端不一样，但手机端在app内或浏览器上都是标准的一套，pc端同理。userInfo不是标准的，根据项目不同，需要自己在相应端的customize.ts文件中修改IRawAppUserConfig的类型定义。oldStyle2Standard函数中转换化标准的userConfig。这就是对接新的交互需要做的大部分工作(msg中还需要修改原生getUserConfig的交互名称)。

## 网络请求

### dz-axios

网络请求使用根据公司常见业务封装好的dz-axios，简单学习，从复杂混乱的网络请求中解放出来，专注于业务开发。[dz-axios文档](http://git.web.dz/WebTeam/common-library/dz-network), 项目中附带了一个网络请求的例子，可以参考。

#### dz-axios中间件

* **globalBlocker** 用于等待获取到app中的登录token再发送网络请求。
* **createBasicPatternMiddleware** 封装了常见的业务场景，能满足基本的业务场景，如有特殊需求，可以参考文档示例自己创建一个中间件即可。
* **createEncryptedGatewayMiddleware** 用于交易网关的加解密请求，如果不需要加解密，可以不使用。

@dz-web/axios-middlewares中提供了一些常用的中间件，可以直接使用，也可以参考自己写一些中间件。

如下是光证交易项目中的java接口共用的axios instance示例

```ts
import { createDZAxiosInstance } from '@dz-web/axios';
import axios from 'axios';
import { createBasicPatternMiddleware, globalBlocker } from '@dz-web/axios-middlewares';
import { logout } from '@/utils/logout';
import { getPlatformIndependentUserConfig } from '@/utils/platfom-indepent/user-config';
import { IJavaAPICommonResponse } from './types';
import { isExpired } from './favorite-stocks/codes';

const isBusinessError = (data: IJavaAPICommonResponse) => data.code !== 0;
const baseURL = window.GLOBAL_CONFIG.COMMON_SERVERS.commonServer;

export const authedCommonJavaInst = createDZAxiosInstance(() => axios.create({
  baseURL,
}), [
  globalBlocker.middleware,
  createBasicPatternMiddleware({
    addHeaders: () => {
      const { language, token } = getPlatformIndependentUserConfig();
      return {
        Token: token,
        'Accept-Language': language,
      };
    },
    isBusinessError,
    onBusinessError: (data) => {
      if (isExpired(data.code)) {
        logout({
          code: data.code,
          message: data.message,
        });
      }
    },
  }),
]);

export const commonJavaInst = createDZAxiosInstance(() => axios.create({
  baseURL,
}), [
  createBasicPatternMiddleware({
    addHeaders: () => {
      const { language } = getPlatformIndependentUserConfig();
      return {
        'Accept-Language': language,
      };
    },
    isBusinessError,
  }),
]);
```

如下是光证交易项目中的交易接口使用的axios instance示例

```ts
import axios from 'axios';
import { createDZAxiosInstance } from '@dz-web/axios';
import { createBasicPatternMiddleware, globalBlocker,
  createEncryptedGatewayMiddleware } from '@dz-web/axios-middlewares';
import { logout } from '@/utils/logout';
import { getPlatformIndependentUserConfig } from '@/utils/platfom-indepent/user-config';
import { ITradeAPIResponse } from './api';
import { initEncryptKey } from './encrypt-api';
import { publicKey } from '../../constants/trade/public-key';
import { isExpired } from './codes';

const isBusinessError = (data: ITradeAPIResponse) => data.code !== 0;

const baseURL = window.GLOBAL_CONFIG.COMMON_SERVERS.commonServer;

export const encryptor = createEncryptedGatewayMiddleware({
  fetchKey: async (postKey: string) => initEncryptKey(baseURL, postKey),
  publicKey,
});

/**
 * 需要登录的请求使用这个axios实例
 */
export const authedTradeAxiosInst = createDZAxiosInstance(() => axios.create({
  baseURL,
}), [
  globalBlocker.middleware,
  ...(window.GLOBAL_CONFIG.ENABLE_ENCRYPT ? encryptor.middlewares : []),
  createBasicPatternMiddleware({
    addHeaders: () => {
      const { language, token } = getPlatformIndependentUserConfig();
      return {
        Token: token,
        'Accept-Language': language,
      };
    },
    isBusinessError,
    // 正常返回，但业务code指示为非0，业务错误
    onBusinessError: (data) => {
      if (isExpired(data.code)) {
        logout({
          code: data.code,
          message: data.message,
        });
      }
    },
    // 非2xx请求，或网络错误
    onFatalError(error, res) {
      if (res.status === 401) {
        logout({
          code: 76,
          message: res.statusText,
        });
      }
    },
  }),
]);

/**
 * 不需要登录的请求使用这个axios实例
 */
export const tradeAxiosInst = createDZAxiosInstance(() => axios.create({
  baseURL,
}), [
  ...(window.GLOBAL_CONFIG.ENABLE_ENCRYPT ? encryptor.middlewares : []),
  createBasicPatternMiddleware({
    addHeaders: () => {
      const { language } = getPlatformIndependentUserConfig();
      return {
        'Accept-Language': language,
      };
    },
    isBusinessError,
  }),
]);
```

### react query

为了方便网络重试、可选统一报错，简化请求代码、提升用户体验，大家需要尽量使用react query进行请求管理。尽量不要自己写请求代码，除非有特殊需求，这样只会隐藏更多的bug、降低用户体验、更庞大的代码量、增加后续项目交接的难度。

#### react query的优点

* 代码风格一致
* 天然缓存、更优的用户体验、支持缓存数据gc回收节约内存
* 简单配置即可实现多种多样的网络数据刷新场景
* 取代大部分redux的场景，减少redux的使用，减少redux的代码量

#### 在项目中使用react query

项目中已经集成了react query v5版本、react query dev tool调试工具，正常使用即可。

## 多语言国际化

为减少冲突，减小每个页面的体积，多语言分为多个层级，一般只需要用到自己页面内的locales目录即可。其它层级的locales会根据.env中的配置，自动合并到自己页面的locales目录中。并在进入页面时在控制台输出合并后的多语言配置内容供参考。

### vscode多语言插件

请安装i18n Ally vscode插件，在代码中查看、修改当前语言内容。

### 多语言配置文件结构

* src/locales
* src/platforms/mobile/locales
* src/platforms/mobile/_native/locales
* src/platforms/mobile/_browser/locales
* src/platforms/mobile/modules/your-page/locales
* src/platforms/pc/locales
* src/platforms/pc/_native/locales
* src/platforms/pc/_browser/locales
* src/platforms/pc/modules/your-page/locales

### 如何保持项目与模板工程的同步

参考创建项目说明中的命令创建项目，默认每个项目会创建一个up-stream分支，跟踪原模板工程中的main分支，后续根据需要cherry-pick合并需要的功能到自己的项目中即可。

## 文件目录

### 目录约定

| 目录 | 作用 | 备注 |
|------|-----|--------|
| /config | 配置文件 | |
| /docs | 项目文档 | |
| /src | 源码 | |
| /src/api | 后端api | |

#### 资源存放平台约定

* /src 目录下为全局共用资源
* /src/platforms/mobile 只属于移动端的资源。
* /src/platforms/mobile/_browser 只属于移动端浏览器端的资源。
* /src/platforms/mobile/_native  只属于移动端原生app内嵌页面的资源
* /src/platforms/pc 只属于pc端的资源。
* /src/platforms/pc/_browser 只属于pc浏览器端的资源。
* /src/platforms/pc/_native  只属于pc原生app内嵌页面的资源

#### 常见目录名称约定 

名字相同，可根据平台，先择存放在不同的平台目录、或页面自己的目录下, 在某一层下面，说明只允许在某一层级下的内容使用, 如只属于某一组件，或某一页面的资源，不需要放到共享里。

| 目录 | 作用 | 备注 |
|------|-----|--------|
| constants | 常量 | |
| hoc | react hoc组件 | |
| components | 页面组件 | |
| utils | 幂等的函数 | 纯函数，每次输入保证有相同输出的函数 |
| helpers | 非幂等的函数 | 非函数，每次输入不保证相同输出的函数或产生了某种副作用的函数 |
| hooks | hooks | |
| images | 图片资源 | |
| styles | css | |
| locales | 国际化语言文件 | |
| modules | 页面模块 | 通常一个页面为一个模块 |

### 文件目录概览

```
.
├── README.md
├── config
│   ├── mobile
│   │   ├── _browser
│   │   │   └── config.js
│   │   ├── _native
│   │   │   └── config.js
│   │   ├── bridge
│   │   │   └── bridge-mock-sample.js
│   │   └── template
│   │       └── index.html
│   └── pc
│       ├── _browser
│       │   └── config.js
│       ├── _native
│       │   └── config.js
│       ├── bridge
│       │   └── bridge-mock-sample.js
│       └── template
│           ├── disable-rem.html
│           ├── index.html
│           └── test-pc-flash-screen.html
├── docs
│   ├── docs
│   │   ├── hello
│   │   │   └── index.md
│   │   └── index.md
│   └── public
│       └── images
│           └── dz-logo.jpg
├── globals.d.ts
├── jest.config.ts
├── package.json
├── pnpm-lock.yaml
├── src
│   ├── api
│   │   └── test-api
│   │       └── instance.ts
│   ├── constants
│   │   ├── caches.ts
│   │   └── config.ts
│   ├── global-events.ts
│   ├── helpers
│   │   ├── import-locales.ts
│   │   ├── init-page-query.ts
│   │   ├── react.tsx
│   │   └── static-config.ts
│   ├── hoc
│   │   ├── query-client.tsx
│   │   ├── redux.tsx
│   │   └── top-error-boundary.tsx
│   ├── locales
│   │   ├── en-US.json
│   │   ├── zh-CN.json
│   │   └── zh-TW.json
│   ├── platforms
│   │   ├── mobile
│   │   │   ├── _browser
│   │   │   │   ├── helpers
│   │   │   │   │   ├── generate-page.tsx
│   │   │   │   │   └── multi-platforms.ts
│   │   │   │   ├── hoc
│   │   │   │   │   └── browser.tsx
│   │   │   │   ├── locales
│   │   │   │   │   ├── en-US.json
│   │   │   │   │   ├── zh-CN.json
│   │   │   │   │   └── zh-TW.json
│   │   │   │   └── modules
│   │   │   │       ├── router-demo.entry.tsx
│   │   │   │       └── trade.entry.tsx
│   │   │   ├── _native
│   │   │   │   ├── helpers
│   │   │   │   │   ├── generate-page.tsx
│   │   │   │   │   ├── msg.ts
│   │   │   │   │   ├── multi-platforms.ts
│   │   │   │   │   └── register.ts
│   │   │   │   ├── hoc
│   │   │   │   │   └── native.tsx
│   │   │   │   ├── locales
│   │   │   │   │   ├── en-US.json
│   │   │   │   │   ├── zh-CN.json
│   │   │   │   │   └── zh-TW.json
│   │   │   │   └── modules
│   │   │   │       ├── router-demo.entry.tsx
│   │   │   │       └── trade.entry.tsx
│   │   │   ├── components
│   │   │   │   └── top-error-boundary-fallback
│   │   │   │       ├── index.scss
│   │   │   │       └── index.tsx
│   │   │   ├── constants
│   │   │   │   └── config.ts
│   │   │   ├── customize.ts
│   │   │   ├── helpers
│   │   │   │   └── theme.ts
│   │   │   ├── hoc
│   │   │   │   └── i18n.tsx
│   │   │   ├── hooks
│   │   │   │   ├── use-language.ts
│   │   │   │   ├── use-user-config.ts
│   │   │   │   └── use-user-info.ts
│   │   │   ├── images
│   │   │   ├── locales
│   │   │   │   ├── en-US.json
│   │   │   │   ├── zh-CN.json
│   │   │   │   └── zh-TW.json
│   │   │   ├── model
│   │   │   │   ├── app
│   │   │   │   │   └── slice.ts
│   │   │   │   ├── minimal-store.ts
│   │   │   │   └── subscriber.ts
│   │   │   ├── modules
│   │   │   │   ├── router-demo
│   │   │   │   │   ├── _page-theme.scss
│   │   │   │   │   ├── index.scss
│   │   │   │   │   ├── index.tsx
│   │   │   │   │   ├── locales
│   │   │   │   │   │   ├── en-US.json
│   │   │   │   │   │   ├── zh-CN.json
│   │   │   │   │   │   └── zh-TW.json
│   │   │   │   │   ├── model
│   │   │   │   │   │   ├── hello
│   │   │   │   │   │   │   └── slice.ts
│   │   │   │   │   │   └── store.ts
│   │   │   │   │   ├── pages
│   │   │   │   │   │   ├── detail
│   │   │   │   │   │   │   └── detail.tsx
│   │   │   │   │   │   ├── index
│   │   │   │   │   │   │   ├── index.scss
│   │   │   │   │   │   │   └── index.tsx
│   │   │   │   │   │   └── not-found
│   │   │   │   │   │       └── not-found.tsx
│   │   │   │   │   └── router.tsx
│   │   │   │   └── trade
│   │   │   │       ├── _page-theme.scss
│   │   │   │       ├── index.scss
│   │   │   │       ├── index.tsx
│   │   │   │       ├── locales
│   │   │   │       │   ├── en-US.json
│   │   │   │       │   ├── zh-CN.json
│   │   │   │       │   └── zh-TW.json
│   │   │   │       └── model
│   │   │   │           ├── hello
│   │   │   │           │   └── slice.ts
│   │   │   │           └── store.ts
│   │   │   ├── styles
│   │   │   │   ├── _theme.scss
│   │   │   │   └── index.scss
│   │   │   └── utils
│   │   │       ├── capacities.ts
│   │   │       └── quotes
│   │   │           ├── colors.test.ts
│   │   │           └── colors.ts
│   │   └── pc
│   │       ├── _browser
│   │       │   ├── helpers
│   │       │   │   ├── generate-page.tsx
│   │       │   │   └── multi-platforms.ts
│   │       │   ├── hoc
│   │       │   │   └── browser.tsx
│   │       │   ├── locales
│   │       │   │   ├── en-US.json
│   │       │   │   ├── zh-CN.json
│   │       │   │   └── zh-TW.json
│   │       │   └── modules
│   │       │       ├── router-demo.entry.tsx
│   │       │       └── trade.entry.tsx
│   │       ├── _native
│   │       │   ├── helpers
│   │       │   │   ├── generate-page.tsx
│   │       │   │   ├── msg.ts
│   │       │   │   ├── multi-platforms.ts
│   │       │   │   └── register.ts
│   │       │   ├── hoc
│   │       │   │   └── native.tsx
│   │       │   ├── locales
│   │       │   │   ├── en-US.json
│   │       │   │   ├── zh-CN.json
│   │       │   │   └── zh-TW.json
│   │       │   ├── modules
│   │       │   │   ├── router-demo.entry.tsx
│   │       │   │   └── trade.entry.tsx
│   │       │   └── utils
│   │       │       └── pc-native-config.ts
│   │       ├── components
│   │       │   └── top-error-boundary-fallback
│   │       │       ├── index.scss
│   │       │       └── index.tsx
│   │       ├── constants
│   │       │   └── config.ts
│   │       ├── customize.ts
│   │       ├── helpers
│   │       │   └── theme.ts
│   │       ├── hoc
│   │       │   └── i18n.tsx
│   │       ├── hooks
│   │       │   ├── use-language.ts
│   │       │   ├── use-user-config.ts
│   │       │   └── use-user-info.ts
│   │       ├── images
│   │       ├── locales
│   │       │   ├── en-US.json
│   │       │   ├── zh-CN.json
│   │       │   └── zh-TW.json
│   │       ├── model
│   │       │   ├── app
│   │       │   │   └── slice.ts
│   │       │   ├── minimal-store.ts
│   │       │   └── subscriber.ts
│   │       ├── modules
│   │       │   ├── router-demo
│   │       │   │   ├── _page-theme.scss
│   │       │   │   ├── index.scss
│   │       │   │   ├── index.tsx
│   │       │   │   ├── locales
│   │       │   │   │   ├── en-US.json
│   │       │   │   │   ├── zh-CN.json
│   │       │   │   │   └── zh-TW.json
│   │       │   │   ├── model
│   │       │   │   │   ├── hello
│   │       │   │   │   │   └── slice.ts
│   │       │   │   │   └── store.ts
│   │       │   │   ├── pages
│   │       │   │   │   ├── detail
│   │       │   │   │   │   └── detail.tsx
│   │       │   │   │   ├── index
│   │       │   │   │   │   ├── index.scss
│   │       │   │   │   │   └── index.tsx
│   │       │   │   │   └── not-found
│   │       │   │   │       └── not-found.tsx
│   │       │   │   └── router.tsx
│   │       │   └── trade
│   │       │       ├── _page-theme.scss
│   │       │       ├── index.scss
│   │       │       ├── index.tsx
│   │       │       ├── locales
│   │       │       │   ├── en-US.json
│   │       │       │   ├── zh-CN.json
│   │       │       │   └── zh-TW.json
│   │       │       └── model
│   │       │           ├── hello
│   │       │           │   └── slice.ts
│   │       │           └── store.ts
│   │       ├── styles
│   │       │   ├── _theme.scss
│   │       │   └── index.scss
│   │       └── utils
│   │           ├── capacities.ts
│   │           └── quotes
│   │               ├── colors.test.ts
│   │               └── colors.ts
│   ├── styles
│   │   ├── _normalize.scss
│   │   └── index.scss
│   ├── types.ts
│   └── utils
│       ├── capacities.ts
│       ├── logout.ts
│       ├── platfom-indepent
│       │   └── user-config.ts
│       ├── platforms.ts
│       └── react-utils.ts
└── tsconfig.json

103 directories, 160 files
```
