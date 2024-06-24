<div style="text-align: center;">
  <img src="https://raw.githubusercontent.com/xun082/md/main/blogs.images20240624204003.png" alt="Current version">
  <h1 align="center">create-ai-toolkit</h1>
  <p>create-ai-toolkit is an AI-driven frontend development tool designed to significantly enhance development efficiency through automation and intelligence. This tool integrates component and hook generation, automated commit messages, and code review functions to help developers maintain high code quality while simplifying and accelerating the development process.</p>

  <h5 align="center">
    <a href="https://github.com/xun082/create-ai-toolkit/blob/main/README-zh.md">中文文档</a>
  </h5>
</div>

## Features

### 1. Automatic Component Generation

create-ai-toolkit can automatically generate standardized frontend components based on user-provided requirements, reducing repetitive work and allowing developers to focus on core business logic.

**Features:**

- Supports multiple frontend frameworks (such as React, Vue).
- Automatically generates TypeScript type definitions.
- Optional integration with CSS preprocessors (such as SASS, LESS, Stylus, Tailwind CSS), etc.
- Automatically generates TypeDoc comments, quickly grasping usage methods.

### 2. Custom Hook Generation

This tool can generate custom hooks based on requirement descriptions, improving code reusability and maintainability.

**Features:**

- Supports multiple frontend frameworks (such as React, Vue).
- Supports complex state management and side effects.
- Automatically generates TypeDoc comments, quickly grasping usage methods.
- Seamlessly integrates with existing components.

### 3. Intelligent Commit Message Generation

create-ai-toolkit can automatically generate commit messages based on the content of the staging area, ensuring a clear and standardized commit history.

**Features:**

- Generates commit messages based on code changes.
- Supports multiple commit message formats (such as Conventional Commits).
- Increases commit efficiency and reduces human error.

### 4. Code Review and Optimization

This tool can perform static analysis and reviews of the code, providing optimization suggestions to help developers improve code quality.

**Features:**

- Identifies potential issues and anti-patterns in the code.
- Provides code optimization suggestions and best practices.
- Supports multiple programming languages and frameworks.

## Usage Guide

### 1. Installation

Ensure your Node.js version is v18 or above, and globally install create-ai-toolkit:

```bash
npm install -g create-ai-toolkit-test
# or using pnpm
pnpm add -g create-ai-toolkit-test
```

### 2. Add API Key

If you don't have a GPT key, you can purchase one from the [OpenAI Official Website](https://platform.openai.com/account/api-keys).

### 3. Set API Key

To use create-ai-toolkit, first execute the following command to globally set the API Key:

```bash
ai set OPENAI_KEY your-key
```

This command will create a `toolkit.config.json` file in the root directory of your operating system.

### 4. View Help

Execute the following command in the terminal:

```bash
ai --help
```

You will see the following result:

![Help Command Result](https://raw.githubusercontent.com/xun082/md/main/blogs.images20240624210552.png)

## Feature Demonstrations

### 1. Automatic Component Generation

Execute the following command to automatically generate a component:

```bash
ai component <name> [path]
```

Where `name` is the component name, and `path` is an optional parameter specifying the path to generate the file, defaulting to the `src/components` directory.

Execute the command and select based on your needs, the final result is shown below:

![Component Generation Result](https://raw.githubusercontent.com/xun082/md/main/blogs.images20240624211944.png)

### 2. Custom Hook Generation

Execute the following command to generate custom hooks:

```bash
ai hooks <name>
```

Where `name` is the name of the hooks file, defaulting to the `src/hooks` directory.

Execute the command and select based on your needs, the final result is shown below:

![Hook Generation Result](https://raw.githubusercontent.com/xun082/md/main/blogs.images20240624212541.png)

### 3. Automatic Commit Message Generation

To generate commit messages, first ensure there is content in your git staging area. Execute the following command to add modified files to the staging area:

```bash
git add .
```

After ensuring there is content in the staging area, execute the following command:

```bash
ai commit
```

The terminal will return appropriate commit messages for you to choose from:

![Commit Message Generation Result](https://raw.githubusercontent.com/xun082/md/main/blogs.images20240624212857.png)

If you select a satisfactory commit message, the tool will automatically execute `git commit -m 'generated commit message'`.

### 4. Automatic Code Review

Based on the content of the staging area, AI will automatically perform a code review and provide modification suggestions. Execute the following command:

```bash
ai review
```

After executing the command, AI will automatically generate a `moment.md` file containing AI's evaluation and modification suggestions:

![Code Review Generation Result](https://raw.githubusercontent.com/xun082/md/main/blogs.images20240624213524.png)

## Configuration

### Change API Key

If you need to change the API Key, you can execute the following command:

```bash
ai set OPENAI_KEY your-key
```

### Get Current API Key

Execute the following command to get the currently set API Key:

```bash
ai get OPENAI_KEY
```

### Change API Endpoint

If you are using a different intermediary API Key or running a large model on your machine, you can execute the following command to change the API endpoint:

```bash
ai set END_POINT http://127.0.0.1:8000
```

![Change API Endpoint Result](https://raw.githubusercontent.com/xun082/md/main/blogs.images20240624213948.png)

### Get Current API Endpoint

Execute the following command to get the currently set API endpoint:

```bash
ai get END_POINT
```

## Contributors

Thank you to all the contributors to this project!

[![Contributors](https://contrib.rocks/image?repo=xun082/create-ai-toolkit)](https://github.com/xun082/create-ai-toolkit/graphs/contributors)

## How to Contribute

- [Contributing Guide (English)](https://github.com/xun082/create-ai-toolkit/blob/main/CONTRIBUTING.md)
- [贡献指南 (中文)](https://github.com/xun082/create-ai-toolkit/blob/main/CONTRIBUTING-zh.md)

## Contact Us

<div style="text-align: center;">
  <img src="https://raw.githubusercontent.com/xun082/md/main/blogs.images20240624215034.png" alt="Current version" style="width: 50%; height: 50%;">
  <p>Email: 2042204285@qq.com</p>
</div>
