import { marked } from 'marked';
import path from 'path';
import fs from 'fs';
import { outro, spinner } from '@clack/prompts';

import { getUserInput } from './select';
import { generatorComponentPrompt } from './prompt';

import { UserSelection } from '@/types';
import { getOpenAiClient, validateFileName, validatePath } from '@/utils';
import { OPENAI_CHAT_COMPLETIONS_ENDPOINT } from '@/utils/constants';

interface CodeBlocks {
  [key: string]: string[];
}

export default async function createComponents({
  componentName,
  componentPath,
}: {
  componentName: string;
  componentPath: string | undefined;
}) {
  try {
    await validateFileName(componentName);

    if (componentPath) {
      await validatePath(componentPath);
      console.log('Valid path.');
    }

    const input = (await getUserInput()) as UserSelection;

    const prompts = generatorComponentPrompt(input);

    const openAiClient = await getOpenAiClient();

    const s = spinner();

    s.start('AI is generating components for you');

    const response = await openAiClient.post(OPENAI_CHAT_COMPLETIONS_ENDPOINT, {
      model: 'gpt-4o',
      messages: [
        {
          role: 'system',
          content: 'You are a helpful assistant that generates component code.',
        },
        { role: 'user', content: prompts },
      ],
      temperature: 0.7,
      max_tokens: 300,
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

    const finalComponentPath = componentPath ? `./src/${componentPath}` : './src/components';
    const outputDir = path.join(process.cwd(), finalComponentPath, componentName);

    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir);
    }

    for (const [key, value] of Object.entries(result)) {
      if (['css', 'less', 'scss'].includes(key)) {
        const filePath = path.join(outputDir, `index.module.${input.cssOption}`);
        fs.writeFileSync(filePath, value.join('\n\n'), 'utf8');
      } else {
        const filePath = path.join(outputDir, `index.tsx`);
        fs.writeFileSync(filePath, value.join('\n\n'), 'utf8');
      }
    }

    s.stop();
    outro('Component creation complete 🎉🎉🎉');
  } catch (error) {
    console.log(error);
  }
}
