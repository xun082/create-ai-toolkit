#!/usr/bin/env node

import { Command } from 'commander';
import Table from 'cli-table3';

import packageJson from '../package.json' assert { type: 'json' };

import { colorize } from './utils';
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
    console.error(colorize('Error ensuring config file exists:', 'red'), error);
    process.exit(1); // 如果无法确保配置文件存在，则退出进程
  }

  const program = new Command();

  program
    .version(packageJson.version)
    .description(
      colorize(
        `南有嘉鱼，烝然罩罩。君子有酒，嘉宾式燕以乐。\n` +
          `南有嘉鱼，烝然汕汕。君子有酒，嘉宾式燕以衎。\n` +
          `南有樛木，甘瓠累之。君子有酒，嘉宾式燕绥之。\n` +
          `南有樛木，甘瓠蕡蕡。君子有酒，嘉宾式燕以仁。`,
        'green',
      ),
    );

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
        console.log(colorize(`Config set: ${key} = ${value}`, 'green'));
      } catch (error) {
        console.error(colorize(`Error setting config: ${error}`, 'red'));
      }
    });

  program
    .command('get <key>')
    .description('Get a global configuration value')
    .action(async (key) => {
      try {
        const value = await getConfig(key as keyof ConfigItem);
        console.log(colorize(`${key} = ${value}`, 'cyan'));
      } catch (error) {
        console.error(colorize(`Error getting config: ${error}`, 'red'));
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
      console.log(colorize(name, 'yellow'));
      generatorHooks(name);
    });

  // 自定义帮助信息
  program.addHelpText('after', () => {
    // 创建表格
    const table = new Table({
      head: [colorize('Command', 'green'), colorize('Description', 'green')],
      colWidths: [30, 70],
      style: {
        head: ['cyan'],
        border: ['grey'],
      },
    });

    // 填充表格内容
    table.push(
      [
        colorize('commit', 'cyan'),
        `Generate a commit message\nAI will automatically generate submission information for you.\n\nExample:\n  ${colorize('$ ai commit', 'blue')}`,
      ],
      [
        colorize('review', 'cyan'),
        `Generate a code review\nAI will automatically generate code review information for you.\n\nExample:\n  ${colorize('$ ai review', 'blue')}`,
      ],
      [
        colorize('set <key> <value>', 'cyan'),
        `Set a global configuration key and value.\n\nParameters:\n  key: The configuration key\n  value: The value to set\n\nExample:\n  ${colorize('$ ai set username john_doe', 'blue')}`,
      ],
      [
        colorize('get <key>', 'cyan'),
        `Get a global configuration value.\n\nParameters:\n  key: The configuration key to retrieve\n\nExample:\n  ${colorize('$ ai get username', 'blue')}`,
      ],
      [
        colorize('component <name> [path]', 'cyan'),
        `Add a new component.\n\nParameters:\n  name: The name of the component\n  path: (Optional) The path to add the component\n\nExample:\n  ${colorize('$ ai component Button src/components', 'blue')}`,
      ],
      [
        colorize('hooks <name>', 'cyan'),
        `Add a new Hooks.\n\nParameters:\n  name: The name of the hooks\n\nExample:\n  ${colorize('$ ai hooks useCustomHook', 'blue')}`,
      ],
    );

    // 返回表格字符串
    return `\n${table.toString()}\n`;
  });

  program.parse(process.argv);
}

main();
