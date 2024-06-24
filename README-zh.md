<div style="text-align: center;">
  <img src="https://raw.githubusercontent.com/xun082/md/main/blogs.images20240624204003.png" alt="Current version">
  <h1 align="center">create-ai-toolkit</h1>
  <p>create-ai-toolkit 是一个由人工智能驱动的前端开发工具，旨在通过自动化和智能化的方式显著提升开发效率。该工具集成了组件和 hooks 生成、提交信息自动化以及代码审查等功能，帮助开发者在保持高代码质量的同时，简化和加速开发流程。</p>
</div>

## 功能

### 1. 自动生成组件

create-ai-toolkit 能够根据用户提供的需求描述，自动生成符合规范的前端组件，减少重复劳动，让开发者能够专注于核心业务逻辑。

**特点：**

- 支持多种前端框架（如 React、Vue）。
- 自动生成 TypeScript 类型定义。
- 可选的 CSS 预处理器集成（如 SASS、LESS、Stylus、Tailwind CSS）等。
- 自动生成 TypeDoc 注释，快速掌握使用方法。

### 2. 自定义 Hooks 生成

该工具能够根据需求描述生成自定义的 hooks，提高代码复用性和可维护性。

**特点：**

- 支持多种前端框架（如 React、Vue）。
- 支持复杂的状态管理和副作用处理。
- 自动生成 TypeDoc 注释，快速掌握使用方法。
- 与现有组件无缝集成。

### 3. 智能提交信息生成

create-ai-toolkit 可以根据暂存区的内容自动生成提交信息，确保提交历史清晰、规范。

**特点：**

- 基于代码变更内容生成提交信息。
- 支持多种提交信息格式（如 Conventional Commits）。
- 提高提交效率，减少人为错误。

### 4. 代码审查和优化

该工具能够对代码进行静态分析和审查，提供优化建议，帮助开发者提升代码质量。

**特点：**

- 识别代码中的潜在问题和反模式。
- 提供代码优化建议和最佳实践。
- 支持多种编程语言和框架。

## 使用指南

### 1. 安装

确保你的 Node.js 版本在 v18 以上，并全局安装 create-ai-toolkit：

```bash
npm install -g create-ai-toolkit-test
# 或者使用 pnpm
pnpm add -g create-ai-toolkit-test
```

### 2. 添加 API Key

如果你没有 GPT 的 key，可以前往 [OpenAI 官方网站](https://platform.openai.com/account/api-keys)进行购买。

### 3. 设置 API Key

要使用 create-ai-toolkit，首先需要执行以下命令来全局设置 API Key：

```bash
ai set OPENAI_KEY 你的key
```

此命令会在你的操作系统根目录创建一个 `toolkit.config.json` 文件。

### 4. 查看帮助

在终端中执行以下命令：

```bash
ai --help
```

你会看到如下效果：

![帮助命令效果](https://raw.githubusercontent.com/xun082/md/main/blogs.images20240624210552.png)

## 具体功能演示

### 1. 自动生成组件

执行以下命令来自动生成组件：

```bash
ai component <name> [path]
```

其中，`name` 为组件名，`path` 为可选参数，指定生成文件的路径，默认在 `src/components` 目录下。

执行命令并根据需求进行选择，最终结果如下图所示：

![生成组件效果](https://raw.githubusercontent.com/xun082/md/main/blogs.images20240624211944.png)

### 2. 自定义 Hooks 生成

执行以下命令来生成自定义 Hooks：

```bash
ai hooks <name>
```

其中，`name` 为 Hooks 文件的名字，默认在 `src/hooks` 目录下。

执行命令并根据需求进行选择，最终结果如下图所示：

![生成 Hooks 效果](https://raw.githubusercontent.com/xun082/md/main/blogs.images20240624212541.png)

### 3. 自动生成提交信息

要生成提交信息，首先确保你的 git 暂存区内有内容。执行以下命令将修改的文件添加到暂存区：

```bash
git add .
```

确保暂存区内有内容后，执行以下命令：

```bash
ai commit
```

终端会返回适当的提交信息供你选择：

![生成提交信息效果](https://raw.githubusercontent.com/xun082/md/main/blogs.images20240624212857.png)

如果选择满意的提交信息，工具会自动执行 `git commit -m '生成的提交信息'`。

### 4. 自动生成 Code Review

根据暂存区内的内容，AI 会自动为你的修改做 Code Review 并提供修改意见。执行以下命令：

```bash
ai review
```

执行命令后，AI 会自动生成一个 `moment.md` 文件，包含 AI 提供的评价和修改建议：

![生成 Code Review 效果](https://raw.githubusercontent.com/xun082/md/main/blogs.images20240624213524.png)

## 配置

### 更换 API Key

如果需要更换 API Key，可以执行以下命令：

```bash
ai set OPENAI_KEY 你的key
```

### 获取当前设置的 API Key

执行以下命令获取当前设置的 API Key：

```bash
ai get OPENAI_KEY
```

### 更换 API 端点

如果使用的是其他中转的 API Key 或在本机上运行的大模型，可以执行以下命令来更换 API 端点：

```bash
ai set END_POINT http://127.0.0.1:8000
```

![更换 API 端点效果](https://raw.githubusercontent.com/xun082/md/main/blogs.images20240624213948.png)

### 获取当前设置的 API 端点

执行以下命令获取当前设置的 API 端点：

```bash
ai get END_POINT
```

## 贡献者

感谢所有为这个项目做出贡献的人！

[![Contributors](https://contrib.rocks/image?repo=xun082/create-ai-toolkit)](https://github.com/xun082/create-ai-toolkit/graphs/contributors)

## 如何贡献

- [Contributing Guide (English)](<[CONTRIBUTING_EN.md](https://github.com/xun082/create-ai-toolkit/blob/main/CONTRIBUTING.md)>)
- [贡献指南 (中文)](https://github.com/xun082/create-ai-toolkit/blob/main/CONTRIBUTING-zh.md)

## 联系我们

<div style="text-align: center;">
  <img src="https://raw.githubusercontent.com/xun082/md/main/blogs.images20240624215034.png" alt="Current version" style="width: 50%; height: 50%;">
  <p>QQ邮箱：2042204285@qq.com</p>
</div>
