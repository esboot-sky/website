---
sidebar_position: 2
title: Plugin
---

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

## prepare

```ts
prepare?: (cfg: Configuration) => void;
```

当执行[esboot prepare](../docs/guides/cli#prepare)的时候会被触发。

通常会做一些初始化操作，比如安装依赖，生成文件等。

### 参数

- `cfg`：当前的配置对象。

### 示例

```ts
import { defineConfig, type Configuration, PluginHooks } from '@dz-web/esboot';

export default defineConfig({
  [PluginHooks.prepare]: [
    {
      key: 'plugin-key',
      prepare: (cfg) => {
        console.log('My plugin is prepared', cfg);
      },
    },
  ],
});
```

## modifyConfig

```ts
[PluginHooks.modifyConfig]?: (
    config: Configuration
) => Partial<Configuration>;
```

在读取完配置后执行，允许在配置被使用前进行修改。

### 参数

- `config`：当前的配置对象。

:::info

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
      modifyConfig: (config) => {
        return {
          output: {
            dir: 'dist-custom',
          },
        };
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
interface Command {
  name: string;
  description?: string;
  allowUnknownOption?: boolean;
  options?: string[];
  action: (...args: any[]) => void;
}
```

更多参数含义可以看[commander](https://github.com/tj/commander.js/)。

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

## modifyTypescriptConfig

```ts
[PluginHooks.modifyTypescriptConfig]?: (
  cfg: Configuration,
  tsconfig: NormalConfig
) => Partial<NormalConfig>;
```

`prepare` 阶段执行，用于修改生成的`tsconfig.json`内容。

### 参数

- `config`：当前的配置对象。
- `tsconfig`：当前的 tsconfig 配置。

### 示例

假设我们有一个插件，它需要修改 tsconfig 的`baseUrl`。

```ts
import { defineConfig, type Configuration } from '@dz-web/esboot';

export default defineConfig({
  plugins: [
    {
      key: 'plugin-key',
      modifyTypescriptConfig: (config, tsconfig) => {
        return {
          baseUrl: 'src',
        };
      },
    },
  ],
});
```

## modifyPrettierConfig

```ts
[PluginHooks.modifyPrettierConfig]?: (
  cfg: Configuration,
  prettierConfig: NormalConfig
) => Partial<NormalConfig>;
```

`prepare` 阶段执行，用于修改生成的`prettier`配置文件内容。

### 参数

- `config`：当前的配置对象。
- `prettierConfig`：当前的 prettier 配置。

### 示例

假设我们有一个插件，它需要修改 prettier 的`tabWidth`。

```ts
import { defineConfig, type Configuration } from '@dz-web/esboot';

export default defineConfig({
  plugins: [
    {
      key: 'plugin-key',
      modifyTypescriptConfig: (config, tsconfig) => {
        return {
          tabWidth: 2,
        };
      },
    },
  ],
});
```

## modifyStylelintConfig

```ts
[PluginHooks.modifyStylelintConfig]?: (
  cfg: Configuration,
  stylelintConfig: NormalConfig
) => Partial<NormalConfig>;
```

`prepare` 阶段执行，用于修改生成的`stylelint`配置文件内容。

### 参数

- `config`：当前的配置对象。
- `stylelintConfig`：当前的 stylelint 配置。

### 示例

假设我们有一个插件，它需要修改 stylelint 的一个 rule(`max-nesting-depth`)。

```ts
import { defineConfig, type Configuration } from '@dz-web/esboot';

export default defineConfig({
  plugins: [
    {
      key: 'plugin-key',
      modifyStylelintConfig: (config, stylelintConfig) => {
        return {
          rules: {
            'max-nesting-depth': 3,
          },
        };
      },
    },
  ],
});
```

## modifyEslintConfig

```ts
[PluginHooks.modifyEslintConfig]?: (
  cfg: Configuration,
  eslintConfig: NormalConfig
) => Partial<NormalConfig>;
```

`prepare` 阶段执行，用于修改生成的`eslint`配置文件内容。

### 参数

- `config`：当前的配置对象。
- `eslintConfig`：当前的 eslint 配置。

### 示例

假设我们有一个插件，它需要修改 eslint 的一个 rule(`no-unused-vars`)。

```ts
import { defineConfig, type Configuration } from '@dz-web/esboot';

export default defineConfig({
  plugins: [
    {
      key: 'plugin-key',
      modifyEslintConfig: (config, eslintConfig) => {
        return {
          rules: {
            'no-unused-vars': 'off',
          },
        };
      },
    },
  ],
});
```

## modifyBundlerConfig

```ts
[PluginHooks.modifyBundlerConfig]?: (
  cfg: Configuration,
  bundlerConfig: NormalConfig,
  bundlerName: string
) => void;
```

Bunder的`dev`/`build` 执行之前执行，用于修改当前bundler的配置文件。很类似于每个bundler的`customConfig`配置，但是`plugin`的好处是可以封装并且跨`bundler`。

### 参数

- `config`：当前的配置对象。
- `bundlerConfig`：当前的 bundler 配置。
- `bundlerName`：当前的 bundler 名称。

### 示例

假设我们有一个插件，它需要修改 webpack 的`output.publicPath`。

```ts
import { defineConfig, type Configuration, PluginHooks } from '@dz-web/esboot';

export default defineConfig({
  plugins: [
    {
      key: 'plugin-key',
      [PluginHooks.modifyBundlerConfig]: (cfg, bundlerConfig, bundlerName) => {
        if (bundlerName === 'webpack') {
          bundlerConfig.output.publicPath = '/module';
        }
      },
    },
  ],
});
```

## afterCompile

```ts
[PluginHooks.afterCompile]?: (cfg: Configuration) => void;
```

`dev`/`build` 执行之后执行，用于在 bundler 编译之后做一些事情。

### 参数

- `config`：当前的配置对象。

### 示例

假设我们有一个插件，它需要在编译之后提示当前编译的页面列表。

```ts
import { defineConfig, type Configuration, PluginHooks } from '@dz-web/esboot';

export default defineConfig({
  plugins: [
    {
      key: 'plugin-key',
      [PluginHooks.afterCompile]: (cfg) => {
        console.log(cfg.entry);
      },
    },
  ],
});
```
