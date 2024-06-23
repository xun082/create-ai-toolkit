import { createChatRequest } from './prompt';

import { getOpenAiClient } from '@/utils';
import { OPENAI_CHAT_COMPLETIONS_ENDPOINT } from '@/utils/constants';

/**
 *
 * @param diff {string}
 * @param options {{locale: string, maxLength: number}}
 */
export const createChatCompletion = async (
  diff: string,
  options: { locale: string; maxLength: number },
) => {
  const { locale, maxLength } = options;
  const json = createChatRequest(diff, { locale, maxLength });

  const openAiClient = await getOpenAiClient();
  const res = await openAiClient.post(OPENAI_CHAT_COMPLETIONS_ENDPOINT, json);

  const parseResult = res.data;
  if ('error' in parseResult) {
    throw new Error(`OpenAI error: ${parseResult.error.message}`);
  }

  return parseResult;
};
