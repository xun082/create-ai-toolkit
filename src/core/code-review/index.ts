import fs from 'node:fs';
import { intro, outro, spinner } from '@clack/prompts';
import path from 'node:path';

import { allStagedFiles2Message, getFilesChangedInGitAdd } from './help';
import { codeReviewPrompt } from './prompt';

import { getOpenAiClient } from '@/utils';
import { OPENAI_CHAT_COMPLETIONS_ENDPOINT } from '@/utils/constants';

export default async function commitMessage() {
  intro('-- 开始读取缓存区文件更改');

  // 获取缓存区的文件列表
  const files = getFilesChangedInGitAdd();

  // 读取文件内容，并存储在staged数组中
  const staged = files.filter(Boolean).map((file) => {
    const content = fs.readFileSync(file, 'utf-8');
    return { filename: file, content };
  });

  // 判断是否有文件被缓存
  if (!staged || staged.length === 0) {
    throw new Error('没有文件被缓存');
  }

  const s = spinner();
  s.start('AI 正在分析您的更改');

  try {
    // 将缓存的文件内容转换为消息
    const content = allStagedFiles2Message(staged);

    const openAiClient = await getOpenAiClient();
    const response = await openAiClient.post(OPENAI_CHAT_COMPLETIONS_ENDPOINT, {
      model: 'gpt-4o',
      messages: [
        {
          role: 'system',
          content: codeReviewPrompt,
        },
        { role: 'user', content: content },
      ],
      temperature: 0.7,
      max_tokens: 4000,
      n: 1,
      stop: null,
    });

    if (
      !response.data ||
      !response.data.choices ||
      !response.data.choices[0] ||
      !response.data.choices[0].message
    ) {
      throw new Error('Invalid response structure from OpenAI API');
    }

    const completion = response.data.choices[0].message.content;
    const filePath = path.join(process.cwd(), `moment.md`);

    fs.writeFileSync(filePath, completion, 'utf8');

    s.stop();
    outro('result');
  } catch (err) {
    s.stop();
    console.error('错误:', err);
    process.exit(1);
  }
}
