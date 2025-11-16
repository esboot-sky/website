---
sidebar_position: 3
---

# Plugin Vitest

Vitest 插件为 ESBoot 项目提供了开箱即用的单元测试能力。该插件集成了 Vitest 测试框架以及 React Testing Library，无需额外配置即可开始编写测试用例。

## 安装

插件已内置以下依赖，无需手动安装：

- [vitest](https://vitest.dev/) - 快速的前端测试框架
- [@testing-library/react](https://testing-library.com/docs/react-testing-library/intro/) - React 组件测试工具
- [@testing-library/user-event](https://testing-library.com/docs/ecosystem-user-event/) - 用户交互模拟工具

## 配置

在 `.esbootrc.ts` 中引入并配置插件：

```ts
import { defineConfig } from '@dz-web/esboot';
import vitestPlugin from '@dz-web/esboot-plugin-vitest';

export default defineConfig({
  plugins: [vitestPlugin()],
});
```

## 使用


### 运行测试

运行测试命令：

```sh
pnpm run esboot vitest
```

`vitest` 命令转发了 [Vitest CLI](https://vitest.dev/guide/cli.html)，内置了 `-r/-c/--dir` 参数，其他 Vitest 支持的参数可以正常使用，例如：

```sh
# 打开 UI 界面
pnpm run esboot vitest --open

# 监听模式运行
pnpm run esboot vitest --watch

# 运行特定测试文件
pnpm run esboot vitest src/components/Button.test.tsx

# 生成覆盖率报告
pnpm run esboot vitest --coverage
```

## 使用示例

### 基础组件测试

```ts
import { test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';

import Home from '@/modules/demo/app';

test('渲染组件并验证文本内容', () => {
  render(<Home />);
  
  const textElement = screen.getByText('close');
  expect(textElement).toBeInTheDocument();
});
```

### 用户交互测试

```ts
import { test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Button from '@/components/Button';

test('点击按钮触发回调', async () => {
  const handleClick = vi.fn();
  const user = userEvent.setup();
  
  render(<Button onClick={handleClick}>点击我</Button>);
  
  await user.click(screen.getByRole('button', { name: '点击我' }));
  
  expect(handleClick).toHaveBeenCalledTimes(1);
});
```

### 异步操作测试

```ts
import { test, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';

import DataFetcher from '@/components/DataFetcher';

test('异步加载数据', async () => {
  const mockData = { name: '测试数据' };
  global.fetch = vi.fn().mockResolvedValue({
    json: async () => mockData,
  });
  
  render(<DataFetcher />);
  
  await waitFor(() => {
    expect(screen.getByText('测试数据')).toBeInTheDocument();
  });
});
```
