import fs from 'node:fs';
import chalk from 'chalk';
import { cancel, intro, outro, spinner, confirm, text, note } from '@clack/prompts';

import { allStagedFiles2Message, autoCommit, getFilesChangedInGitAdd } from './help';
import { createChatCompletion } from './openai';

export default async function commitMessage() {
  intro(chalk.bgCyan(chalk.black('开始读取缓存区文件更改')));
  // 获取缓存区的文件列表
  const files = getFilesChangedInGitAdd();

  // 读取文件内容，并存储在staged数组中
  const staged = files.filter(Boolean).map((file) => {
    const content = fs.readFileSync(file, 'utf-8');
    return { filename: file, content };
  });

  // 判断是否有文件被缓存
  if (!staged || staged.length === 0) {
    cancel('请检查是否执行git add .');
    process.exit(0);
  }
  const s = spinner();
  s.start('AI 正在分析您的更改');

  try {
    // 将缓存的文件内容转换为消息
    // const content = allStagedFiles2Message(staged);

    // 使用 OpenAI API 生成提交信息
    // const message = await createChatCompletion(content, { locale: 'zh-CN', maxLength: 200 });

    // 检查 OpenAI API 的响应结构
    // if (!message || !message.choices || !message.choices[0] || !message.choices[0].message) {
    //   cancel('OpenAI API 响应结构无效');
    //   process.exit(0);
    // }

    // const completion = message.choices[0].message.content;

    // 去除不需要的字符
    // const result = completion.replace(/[*_`~]/g, '');

    s.stop();
    const commitMsg = 'ci: test commit';
    note(commitMsg);
    const answer = await confirm({
      message: '是否使用以上提交信息？',
      active: '确定',
      inactive: '取消',
    });
    if (answer) {
      spinner().start('正在提交...');
      const code = await autoCommit(commitMsg);
      spinner().stop();
      if (code === 0) {
        outro('提交成功');
      } else {
        cancel('提交失败');
      }
    }
  } catch (err) {
    s.stop();
    console.error('错误:', err);
    process.exit(1);
  }
}
