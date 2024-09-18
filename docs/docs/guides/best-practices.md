---
sidebar_position: 998
---

# Best Practices

## Static Config

一般我们会外挂一个`config.js`文件来支持运行时配置。项目里面会有很多代码依赖这个配置，但是这个配置文件往往是一些不懂代码的人来配置，很容易出错，所以代码中读取的时候不要直接读，比如：

```ts
// bad
const xx = window.GLOBAL_CONFIG.xx;
```

而是通过一个单例Config来读取，提供fallback和报错机制。

*static-config.ts*

- 必填项抛出warning，并且提供默认值不能让整个页面崩溃。
- 非必填项提供默认值

```ts
import { get } from 'lodash-es';

export enum CommonServer {
  base = 'base',
}

export default new (class StaticConfig {
  config: Record<string, any>;

  constructor() {
    this.config = window?.GLOBAL_CONFIG ?? {};
  }

  getRawConfig() {
    return this.config;
  }

  getConfig(path: string, defaultValue = '') {
    return get(this.config, path, defaultValue);
  }

  getCommonServer(path = 'commonServer', defaultValue = '') {
    return this.getConfig(`COMMON_SERVERS.${path}`, defaultValue);
  }

  getStrategyWechatLink() {
    const link = this.config.strategyWechatLink;

    if (!link) {
      console.error('strategyWechatLink请配置策略工具广告页获客链接');
      return '';
    }

    return link;
  }
})();
```

*index.ts*

```ts
// good
import staticConfig from '@/helpers/static-config';

const xx = staticConfig.getAdvertisementServer();
```

## Html Loading

有时候在弱网环境下，页面加载时间过长，用户可能会长时间看到白屏，所以需要一个loading来提升用户体验。

并且来分辨是页面加载慢还是页面报错导致的白屏。

*tempalte/index.html*

```html
<head>
  <style>
    .global_loading {
      display: flex;
      justify-content: center;
      align-items: center;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      width: 100%;
      box-sizing: border-box;
      padding: 30px;
      background: transparent;
    }

    .global_img {
      width: 30px;
      height: 30px;
      animation: global_loading_rotate-img 1.5s linear infinite reverse;
    }

    @keyframes global_loading_rotate-img {
      from {
        transform: rotate(360deg);
      }

      to {
        transform: rotate(0deg);
      }
    }
  </style>
</head>

<body>
  <div id="root">
    <div class="global_loading">
      <img class="global_img" src="./static/loading.svg" alt="" />
    </div>
  </div>
</body>
```

## i18n

i18n一般默认用的[React Intl](https://github.com/formatjs/react-intl)或者[React I18next](https://react.i18next.com/)。

常规情况下需要支持简繁体，所以最少需要两个语言包。一些特殊情况也需要支持英文，所以可能需要三个语言包。

之前一般都是就近创建一个`lang`目录，里面有

- `zh-CN.ts`
- `zh-TW.ts`
- `en-US.ts`

但是这样会有一个问题。

- `ts`太过于灵活，甚至可以互相引用和写逻辑。
- 如果创建的文件太多，会导致多语言很分散，不方便管理，里面有大量的重复字段。

这样对于项目的维护来说非常不友好，特别是开始有单个多语言，后续需要加语言包的场景。

所以，推荐使用`json`来管理多语言。

- 使用`json`来管理多语言，可以避免`ts`的灵活性带来的问题。
- 使用`json`来管理多语言，可以避免创建大量的文件，方便管理。
- 使用`json`来管理多语言，可以避免重复字段的问题。

约定所有的语言包都放在`src/lang`目录下，并且所有的语言包都放在一个文件夹下，比如`zh-CN.json`、`zh-TW.json`、`en-US.json`。并且通过`xx.xx.xx`来区分不同的层级。比如：

```json
{
  "global": {
    "project": "测试项目名称",
    "boundaryErrorTitle": "哎呀，出错了！",
    "apologize": "抱歉，应用程序遇到了一些问题。",
    "retry": "重试"
  },
  "south-stock-ranking": {},
  "north-model": {},
  "test": {},
  "test2": {
    "test": "2"
  }
}
```

使用的时候，通过`global.project`来获取项目名称，通过`global.boundaryErrorTitle`来获取错误标题。

这样可以大大的减少重复字段的产生，和减少维护成本。

但是这样产生了一个新的问题多语言包会变大，在`MP`项目中可能会有很多页面，所以一定要开启[useLangJsonPicker](../config#uselangjsonpicker)，会根据[Page Metadata](./entry-files#langjsonpicker)的配置来按需加载语言包。

所以推荐`Page Metadata`中配置如下：

```ts
export default {
  // 公共的字段
  // 当前页面的字段
  langJsonPicker: ['global', 'test', '...Other Common Fields'],
};
```

这样就可以大大的减少语言包的大小，和提升加载速度。
