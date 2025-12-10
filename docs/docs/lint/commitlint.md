---
sidebar_position: 4
title: Commitlint
---

## 介绍

`ESBoot@4`基于`commitlint@20`进行Commit message的检测。

## 开始使用

在`package.json`中添加以下配置：

```json
"commitlint": {
  "extends": [
    "./node_modules/.cache/esboot/commitlint"
  ]
},
```

## 规则

`ESBoot` 的 commitlint 配置基于 `@commitlint/config-conventional`，并包含以下自定义规则：

### 类型规则

#### type-case

**规则级别：** 错误 (2)

**规则说明：** commit 类型必须使用小写字母。

**示例：**

```text
✅ feat: 添加新功能
❌ Feat: 添加新功能
❌ FEAT: 添加新功能
```

#### type-empty

**规则级别：** 错误 (2)

**规则说明：** commit 类型不能为空。

**示例：**

```text
✅ feat: 添加新功能
❌ : 添加新功能
```

#### type-enum

**规则级别：** 错误 (2)

**规则说明：** commit 类型必须是以下值之一：`build`、`chore`、`ci`、`docs`、`feat`、`fix`、`perf`、`refactor`、`revert`、`style`、`test`。

**允许的类型：**

- `build`: 构建系统或外部依赖的更改
- `chore`: 其他不修改 src 或 test 文件的更改
- `ci`: CI 配置文件和脚本的更改
- `docs`: 仅文档更改
- `feat`: 新功能
- `fix`: 错误修复
- `perf`: 性能优化的更改
- `refactor`: 既不修复错误也不添加功能的代码更改
- `revert`: 回滚之前的提交
- `style`: 不影响代码含义的更改（空白、格式、缺少分号等）
- `test`: 添加或修改测试

**示例：**

```text
✅ feat: 添加用户登录功能
✅ fix: 修复登录验证问题
✅ docs: 更新 README 文档
❌ feature: 添加新功能
❌ bugfix: 修复问题
```

### 主题规则

#### subject-case

**规则级别：** 错误 (2)

**规则说明：** commit 主题不能使用以下大小写格式：`sentence-case`（句子格式）、`start-case`（首字母大写）、`pascal-case`（帕斯卡命名）、`upper-case`（全大写）。

**示例：**

```text
✅ feat: add user login
✅ feat: 添加用户登录
❌ feat: Add user login
❌ feat: Add User Login
❌ feat: ADD USER LOGIN
```

#### subject-empty

**规则级别：** 错误 (2)

**规则说明：** commit 主题不能为空。

**示例：**

```text
✅ feat: 添加新功能
❌ feat:
```

#### subject-full-stop

**规则级别：** 错误 (2)

**规则说明：** commit 主题不能以句号（`.`）结尾。

**示例：**

```text
✅ feat: 添加新功能
❌ feat: 添加新功能.
```

#### header-max-length

**规则级别：** 错误 (2)

**规则说明：** commit 头部（包括类型、冒号、空格和主题）的最大长度为 100 个字符。

**示例：**

```text
✅ feat: 添加用户登录功能
❌ feat: 这是一个非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常长的主题
```

### 正文规则

#### body-leading-blank

**规则级别：** 警告 (1)

**规则说明：** commit 正文前必须有一个空行。

**示例：**

```text
✅ feat: 添加新功能

这是详细的说明信息。

❌ feat: 添加新功能
这是详细的说明信息。
```

#### body-max-line-length

**规则级别：** 错误 (2)

**规则说明：** commit 正文每行的最大长度为 100 个字符。

**示例：**

```text
✅ feat: 添加新功能

这是一行正常的说明文字，长度在 100 字符以内。

❌ feat: 添加新功能

这是一行非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常长的说明文字，超过了 100 字符的限制。
```

### 页脚规则

#### footer-leading-blank

**规则级别：** 警告 (1)

**规则说明：** commit 页脚前必须有一个空行。

**示例：**

```text
✅ feat: 添加新功能

这是正文内容。

Closes #123

❌ feat: 添加新功能

这是正文内容。
Closes #123
```

#### footer-max-line-length

**规则级别：** 错误 (2)

**规则说明：** commit 页脚每行的最大长度为 100 个字符。

**示例：**

```text
✅ feat: 添加新功能

这是正文内容。

Closes #123

❌ feat: 添加新功能

这是正文内容。

Closes #123, #456, #789, #101112, #131415, #161718, #192021, #222324, #252627, #282930, #313233, #343536, #373839, #404142, #434445, #464748, #495051, #525354, #555657, #585960, #616263, #646566, #676869, #707172, #737475, #767778, #798081, #828384, #858687, #888990, #919293, #949596, #979899, #100101102
```

## 示例

### 简略示例

```text
feat: 添加用户登录功能
```

### 完整示例

一个符合所有规则的 commit message 示例：

```text
feat: 添加用户登录功能

实现了基于 JWT 的用户认证系统，包括登录、登出和 token 刷新功能。
支持记住密码和自动登录选项。

Closes #123
Refs #456
```
