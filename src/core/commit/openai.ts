import https from 'https';
import type { ClientRequest, IncomingMessage } from 'http';

import { createChatRequest } from './prompt';

import { openAiClient } from '@/utils';

let OPENAI_API_KEY: string;

/**
 * 老方法，使用https调
 * @param json
 */
const callOpenAI = async (
  json: string,
): Promise<{ data: string; request: ClientRequest; response: IncomingMessage }> => {
  return new Promise((resolve, reject) => {
    const postBody = JSON.stringify(json);
    const request = https.request(
      {
        port: 443,
        host: 'api.openai.com',
        path: '/v1/chat/completions',
        method: 'POST',
        timeout: 20000, // 20 seconds 为了让接口有充足的时间把内容返回
        headers: {
          Authorization: `Bearer ${OPENAI_API_KEY}`,
          'Content-Type': 'application/json',
        },
      },
      (response) => {
        const res: Buffer[] = [];
        response.on('data', (chunk) => res.push(chunk));
        response.on('end', () => {
          const data = Buffer.concat(res).toString();
          resolve({
            request,
            response,
            data,
          });
        });
      },
    );
    request.on('error', reject);
    request.on('timeout', () => {
      request.destroy();
      reject(new Error(`Request timeout`));
    });
    request.write(postBody);
    request.end();
  });
};

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
  // 获取apikey, 并且调openai的接口
  const res = await openAiClient.post('/v1/chat/completions', json);
  const parseResult = JSON.parse(res.data);
  if ('error' in parseResult) {
    throw new Error(`OpenAI error: ${parseResult.error.message}`);
  }
  return res.data;
};
