import path from 'path';
import { promises as fs } from 'fs';
import os from 'os';

import { CONFIG_FILE_NAME } from '@/utils/constants';
import { ConfigItem } from '@/types';

function getConfigFilePath(): string {
  return path.join(os.homedir(), CONFIG_FILE_NAME);
}

async function ensureConfigFileExists(): Promise<void> {
  const configFilePath = getConfigFilePath();
  try {
    await fs.access(configFilePath);
  } catch {
    console.log('Config file does not exist. Creating a default config file.');

    const defaultConfig: ConfigItem = {
      OPEN_AI_KEY: '',
      END_POINT: 'https://api.openai.com/',
    };

    try {
      await fs.writeFile(configFilePath, JSON.stringify(defaultConfig, null, 2));
      console.log(`Default config file created at: ${configFilePath}`);
    } catch (writeError) {
      console.error('Error creating config file:', writeError);
    }
  }
}

export async function setConfig(key: keyof ConfigItem, value: string): Promise<void> {
  await ensureConfigFileExists();

  const configFilePath = getConfigFilePath();
  try {
    const fileContent = await fs.readFile(configFilePath, 'utf8');
    const config = JSON.parse(fileContent) as ConfigItem;
    config[key] = value;
    await fs.writeFile(configFilePath, JSON.stringify(config, null, 2));
    console.log(`Config set: ${key} = ${value}`);
  } catch (error) {
    console.error('Error setting config:', error);
  }
}

export async function getConfig(key: keyof ConfigItem): Promise<string | undefined> {
  await ensureConfigFileExists();

  const configFilePath = getConfigFilePath();
  try {
    const fileContent = await fs.readFile(configFilePath, 'utf8');
    const config = JSON.parse(fileContent) as ConfigItem;
    return config[key];
  } catch (error) {
    console.error('Error reading config file:', error);
    return undefined;
  }
}

// 在脚手架项目初始化时调用此函数
export async function initializeProject(): Promise<void> {
  await ensureConfigFileExists();
}
