#!/usr/bin/env node

import { Command } from 'commander';

import packageJson from '../package.json' assert { type: 'json' };

import { setConfig, getConfig, initializeProject } from './core/config';
import { osRootDirectory } from './utils';
import { ConfigItem } from './types';
import createComponents from './core/components';
import aiCommit from './core/commit';

async function main() {
  console.log(osRootDirectory());

  try {
    await initializeProject();
  } catch (error) {
    console.error('Error ensuring config file exists:', error);
    process.exit(1); // 如果无法确保配置文件存在，则退出进程
  }

  const program = new Command();

  program.version(packageJson.version).description('Moment!!!');

  program
    .command('commit')
    .description('Generate a commit message')
    .description('AI will automatically generate submission information for you')
    .action(() => {
      aiCommit();
    });

  program
    .command('set <key> <value>')
    .description('Set a global configuration key and value')
    .action(async (key, value) => {
      try {
        await setConfig(key as keyof ConfigItem, value);
        console.log(`Config set: ${key} = ${value}`);
      } catch (error) {
        console.error(`Error setting config: ${error}`);
      }
    });

  program
    .command('get <key>')
    .description('Get a global configuration value')
    .action(async (key) => {
      try {
        const value = await getConfig(key as keyof ConfigItem);
        console.log(`${key} = ${value}`);
      } catch (error) {
        console.error(`Error getting config: ${error}`);
      }
    });

  program
    .command('component <name> [path]')
    .description('Add a new component')
    .action(async (name, path) => {
      createComponents({ componentName: name, componentPath: path });
    });

  program.parse(process.argv);
}

main();
