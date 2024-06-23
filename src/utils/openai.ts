import axios, { AxiosInstance } from 'axios';

import { getConfig } from '@/core/config';

let openAiClient: AxiosInstance;

(async () => {
  const endpoint = await getConfig('END_POINT');
  const apiKey = await getConfig('OPEN_AI_KEY');
  openAiClient = axios.create({
    baseURL: `${endpoint}`,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
  });
})();

export { openAiClient };
