import fs from 'fs';
import path from 'path';
import { marked } from 'marked';
import { outro, spinner } from '@clack/prompts';

import { getUserInput } from './select';
import { generatorComponentPrompt } from './prompt';

import { getOpenAiClient, validateFileName, validatePath } from '@/utils';
import { OPENAI_CHAT_COMPLETIONS_ENDPOINT } from '@/utils/constants';
import { UserSelection } from '@/types';

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
  const s = spinner();
  try {
    await validateFileName(componentName);

    if (componentPath) {
      await validatePath(componentPath);
      console.log('Valid path.');
    }

    const input = (await getUserInput()) as UserSelection;

    const prompts = generatorComponentPrompt(input);

    const openAiClient = await getOpenAiClient();

    s.start('AI is generating components for you');

    const response = await openAiClient.post(OPENAI_CHAT_COMPLETIONS_ENDPOINT, {
      model: 'gpt-4o',
      messages: [
        { role: 'system', content: 'You are a helpful assistant that generates component code.' },
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
      fs.mkdirSync(outputDir, { recursive: true });
    }

    for (const [key, value] of Object.entries(result)) {
      if (['css', 'less', 'scss'].includes(key)) {
        const filePath = path.join(outputDir, `index.module.${input.cssOption || 'css'}`);
        fs.writeFileSync(filePath, value.join('\n\n'), 'utf8');
      } else {
        const filePath = path.join(outputDir, `index.tsx`);
        fs.writeFileSync(filePath, value.join('\n\n'), 'utf8');
      }
    }

    outro('Component creation complete 🎉🎉🎉');
  } catch (error) {
    console.error('Error creating component:', error);
    // Handle specific errors or log them appropriately
  } finally {
    s.stop();
  }
}
