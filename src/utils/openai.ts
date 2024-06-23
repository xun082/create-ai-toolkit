import axios, { AxiosInstance } from 'axios';

import { getConfig } from '@/core/config';

let openAiClient: AxiosInstance;

const initializeOpenAiClient = async () => {
  try {
    const endpoint = await getConfig('END_POINT');
    const apiKey = await getConfig('OPEN_AI_KEY');
    openAiClient = axios.create({
      baseURL: `${endpoint}`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
    });
  } catch (error) {
    console.error('Failed to initialize OpenAI client:', error);
  }
};

const getOpenAiClient = async (): Promise<AxiosInstance> => {
  if (!openAiClient) {
    await initializeOpenAiClient();
  }
  return openAiClient;
};

export { getOpenAiClient };
