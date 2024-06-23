#!/usr/bin/env node

import { Command } from 'commander';
import Table from 'cli-table3';

import packageJson from '../package.json' assert { type: 'json' };

import { setConfig, getConfig, initializeProject } from './core/config';
import { ConfigItem } from './types';
import createComponents from './core/components';
import commitMessage from './core/commit';
import generatorHooks from './core/hooks';
import aiCodeReview from './core/code-review';

async function main() {
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
    .description(
      'Generate a commit message\nAI will automatically generate submission information for you',
    )
    .action(() => {
      commitMessage();
    });

  program
    .command('review')
    .description(
      'Generate a code review\nAI will automatically generate code review information for you',
    )
    .action(() => {
      aiCodeReview();
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

  program
    .command('hooks <name>')
    .description('Add a new Hooks')
    .action(async (name) => {
      console.log(name);
      generatorHooks(name);
    });

  // 自定义帮助信息
  program.addHelpText('after', () => {
    // 创建表格
    const table = new Table({
      head: ['Command', 'Description'],
      colWidths: [30, 70],
      style: {
        head: ['cyan'],
        border: ['grey'],
      },
    });

    // 填充表格内容
    table.push(
      [
        'commit',
        'Generate a commit message\nAI will automatically generate submission information for you.\n\nExample:\n  $ ai commit',
      ],
      [
        'review',
        'Generate a code review\nAI will automatically generate code review information for you.\n\nExample:\n  $ ai review',
      ],
      [
        'set <key> <value>',
        'Set a global configuration key and value.\n\nParameters:\n  key: The configuration key\n  value: The value to set\n\nExample:\n  $ ai set username john_doe',
      ],
      [
        'get <key>',
        'Get a global configuration value.\n\nParameters:\n  key: The configuration key to retrieve\n\nExample:\n  $ ai get username',
      ],
      [
        'component <name> [path]',
        'Add a new component.\n\nParameters:\n  name: The name of the component\n  path: (Optional) The path to add the component\n\nExample:\n  $ ai component Button src/components',
      ],
      [
        'hooks <name>',
        'Add a new Hooks.\n\nParameters:\n  name: The name of the hooks\n\nExample:\n  $ ai hooks useCustomHook',
      ],
    );

    // 返回表格字符串
    return `\n${table.toString()}\n`;
  });

  program.parse(process.argv);
}

main();
