import { outro, spinner } from '@clack/prompts';
import { marked } from 'marked';
import path from 'path';
import fs from 'fs/promises'; // 使用异步的文件系统操作

import { getUserInput } from './select';
import { generatorComponentPrompt } from './prompt';

import { getOpenAiClient, validateFileName } from '@/utils';
import { CustomHooksSelection } from '@/types';
import { OPENAI_CHAT_COMPLETIONS_ENDPOINT } from '@/utils/constants';

interface CodeBlocks {
  [key: string]: string[];
}

async function getOpenAIResponse(prompts: string) {
  const openAiClient = await getOpenAiClient();
  const response = await openAiClient.post(OPENAI_CHAT_COMPLETIONS_ENDPOINT, {
    model: 'gpt-4o',
    messages: [
      {
        role: 'system',
        content: 'You are a helpful assistant that generates custom hooks.',
      },
      { role: 'user', content: prompts },
    ],
    temperature: 0.7,
    max_tokens: 2000,
    n: 1,
    stop: null,
  });

  if (!response.data?.choices?.[0]?.message) {
    throw new Error('Invalid response structure from OpenAI API');
  }

  return response.data.choices[0].message.content;
}

function parseCompletionToCodeBlocks(completion: string): CodeBlocks {
  const tokens = marked.lexer(completion);
  const result: CodeBlocks = {};

  tokens.forEach((token) => {
    if (token.type === 'code') {
      const lang = token.lang || 'plaintext';
      if (!result[lang]) {
        result[lang] = [];
      }
      result[lang].push(token.text);
    }
  });

  return result;
}

async function writeCodeBlocksToFile(
  result: CodeBlocks,
  outputDir: string,
  fileName: string,
  prefix: string,
) {
  await fs.mkdir(outputDir, { recursive: true });

  for (const [key, value] of Object.entries(result)) {
    const filePath = path.join(outputDir, `${fileName}.${prefix}`);
    await fs.writeFile(filePath, value.join('\n\n'), 'utf8');
  }
}

export default async function generatorHooks(fileName: string) {
  const s = spinner();
  try {
    await validateFileName(fileName);

    const input = (await getUserInput()) as CustomHooksSelection;
    const prompts = generatorComponentPrompt(input);

    s.start('AI is generating hooks for you');

    const completion = await getOpenAIResponse(prompts);
    const result = parseCompletionToCodeBlocks(completion);

    const finalComponentPath = './src/hooks';
    const outputDir = path.join(process.cwd(), finalComponentPath);

    const prefix =
      input.framework === 'vue'
        ? 'vue'
        : input.framework === 'react' && input.languageType === 'typescript'
          ? 'tsx'
          : 'jsx';

    await writeCodeBlocksToFile(result, outputDir, fileName, prefix);

    outro('Hooks creation complete 🎉🎉🎉');
  } catch (error) {
    console.error(error);
  } finally {
    s.stop();
  }
}
