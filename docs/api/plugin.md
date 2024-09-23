---
sidebar_position: 2
---

# Plugin API

## onActivated

```ts
onActivated?: (cfg: Configuration) => void;
```

当插件被注册的时候会被触发。

### 参数

- `cfg`：当前的配置对象。

### 示例

```ts
import { defineConfig, type Configuration } from '@dz-web/esboot';

export default defineConfig({
  plugins: [
    {
      key: 'plugin-key',
      onActivated: (cfg) => {
        console.log('My plugin is activated', cfg);
      },
    },
  ],
});
```

## modifyConfig

```ts
[PluginHooks.modifyConfig]?: (
  config: Configuration,
  patch: (typeof cfg)['patch']
) => void;
```

在读取完配置后执行，允许在配置被使用前进行修改。

### 参数

- `config`：当前的配置对象。
- `patch`：用于修改配置的函数。

:::info

在 modifyConfig 中，我们使用 patch 函数来修改配置。patch 函数接收一个对象，该对象的属性将合并到现有的配置中。

请不要直接修改 config 对象，这样是无效的。

:::

### 示例

假设我们有一个插件，它需要修改输出目录。

```ts
import { defineConfig, type Configuration } from '@dz-web/esboot';

export default defineConfig({
  plugins: [
    {
      key: 'plugin-key',
      modifyConfig: (config, patch) => {
        patch({
          output: {
            dir: 'dist-custom',
          },
        });
      },
    },
  ],
});
```

## registerCommands

```ts
[PluginHooks.registerCommands]?: (cfg: Configuration) => Command[];
```

注册命令。

### 参数

- `cfg`：当前的配置对象。

### 返回值

- `Command[]`：命令数组。

```ts
{
  name: string; // 命令名称
  description?: string; // 命令描述
  options?: string[]; // 命令选项
  action: (...args: any[]) => void; // 命令执行函数
}
```

### 示例

```ts
import { defineConfig, type Configuration } from '@dz-web/esboot';

export default defineConfig({
  plugins: [
    {
      key: 'plugin-key',
      registerCommands: (cfg) => {
        return [
          {
            name: 'test',
            description: 'This is a test command',
            options: ['-f, --file <char>', '-s, --sampleFile <char>'],
            action: (options) => {
              // 在这里读到用户输入的参数 比如options.file
              console.log('This is a test command', options);
            },
          },
        ];
      },
    },
  ],
});
```
