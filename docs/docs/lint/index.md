---
sidebar_position: 1
---

# Rules & Lint

为了统一编码规范，ESBoot 内置了 脚本和样式的编写规则，以及lint检测。

- 脚本检测基于[ESLint](https://eslint.org/)
- 样式检测基于[Stylelint](https://stylelint.io/)
- Commit检测基于[Commitlint](https://commitlint.js.org/)
- 提交检测基于[Husky](https://github.com/typicode/husky)

所有的配置文件都会在`install`阶段自动生成。当然，你也可以手动执行`esboot prepare`命令来生成。
