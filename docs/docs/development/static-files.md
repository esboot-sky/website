---
sidebar_position: 6
---

# Static

## Static Files

静态文件不需要额外的配置，esboot会自动去根目录的`config`目录下去找。以`esboot.txt`文件来说，规则如下：

1. 当放在`config/static/esboot.txt`的时候，此时无论什么平台打包，都会生成到`dist/static/esboot.ext`中去。
2. 当放在`config/mobile/static/esboot.txt`的时候，只有当`ESBOOT_PLATFORM=mobile`的时候才会生效，生成到`dist/static/esboot.ext`中去。`config/pc/static/esboot.txt`和`ESBOOT_PLATFORM=pc`的时候同理。
3. 当放在`config/mobile/browser/static/esboot.txt`的时候，只有当`ESBOOT_PLATFORM=mobile和ESBOOT_PAGE_TYPE=browser`的时候才会生效，生成到`dist/static/esboot.ext`中去，其他平台同理。

上述的三条规则可以叠加，当同时存在的时候，指定更详细的会覆盖外面的，3 > 2 > 1。

## Runtime Config

项目运行时配置一般是外挂一个`config.js`文件，`config.js`在`config`目录的每个平台下，比如`config/mobile/browser/config.js`，会自动生成到对应的平台下面的`config`生成到`dist/config.js`中。

一般我们会外挂一个 `config.js` 文件来支持运行时配置。项目里面会有很多代码依赖这个配置，但是这个配置文件往往是一些不懂代码的人来配置，很容易出错，所以代码中读取的时候不要直接读。

### 不推荐的做法

```ts
// ❌ bad: 直接读取，没有错误处理和默认值
const xx = window.GLOBAL_CONFIG.xx;
```

### 推荐的做法

而是通过一个单例 Config 来读取，提供 fallback 和报错机制。

**实现要点**：

- 必填项抛出 warning，并且提供默认值不能让整个页面崩溃
- 非必填项提供默认值

**示例代码**：

`static-config.ts`

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

`index.ts`

```ts
// ✅ good: 通过单例读取，有错误处理和默认值
import staticConfig from '@/helpers/static-config';

const xx = staticConfig.getAdvertisementServer();
```

:::tip 优势

使用单例 Config 的好处：

- **错误处理**：可以统一处理配置缺失的情况
- **默认值**：提供合理的默认值，避免页面崩溃
- **类型安全**：可以通过 TypeScript 提供类型提示
- **易于维护**：集中管理配置读取逻辑

:::
