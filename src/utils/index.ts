import * as path from 'path';
import { promises as fs } from 'fs';
import * as os from 'os';
import { execSync } from 'node:child_process';

import { Staged } from '@/types';

export * from './openai';
export * from './color';

/**
 * 获取操作系统的根目录。
 *
 * @returns {string} 返回操作系统的根目录路径。
 *
 * @example
 * // 对于 Windows 系统
 * const rootDir = osRootDirectory();
 * console.log(rootDir); // 输出 'C:\\' 或其他盘符
 *
 * @example
 * // 对于类 Unix 系统 (包括 macOS 和 Linux)
 * const rootDir = osRootDirectory();
 * console.log(rootDir); // 输出 '/'
 */
export function osRootDirectory(): string {
  if (os.platform() === 'win32') {
    // Windows 系统的根目录
    return path.parse(process.cwd()).root;
  } else {
    // 类 Unix 系统的根目录 (包括 macOS 和 Linux)
    return '/';
  }
}

export async function validateFileName(componentName: string): Promise<void> {
  // 验证文件名是否合法
  if (!/^[a-zA-Z0-9-_]+$/.test(componentName)) {
    throw new Error(
      'Invalid component name. Only alphanumeric characters, dashes, and underscores are allowed.',
    );
  }
}

export async function validatePath(componentPath: string): Promise<void> {
  // 验证路径是否合法
  const dir = path.resolve(componentPath);

  try {
    const stat = await fs.stat(dir);
    if (!stat.isDirectory()) {
      throw new Error('Invalid path. The specified directory does not exist.');
    }
  } catch (error) {
    throw new Error('Invalid path. The specified directory does not exist.');
  }
}

export function getFilesChangedInGitAdd() {
  const gitDiff = execSync('git diff --cached --name-status', { encoding: 'utf-8' });
  const files = gitDiff.split('\n');

  // 过滤掉 lock 文件和被删除的文件
  const ignoredPatterns = [/package-lock\.json$/, /yarn\.lock$/, /pnpm-lock\.yaml$/];
  const filteredFiles = files
    .map((line) => {
      const [status, file] = line.trim().split('\t');
      return { status, file };
    })
    .filter(({ status, file }) => {
      return file && status !== 'D' && !ignoredPatterns.some((pattern) => pattern.test(file));
    })
    .map(({ file }) => file);

  return filteredFiles;
}

export function allStagedFiles2Message(staged: Staged[]) {
  return staged.map((item) => item.content).join('\n');
}

/**
 * 自动执行提交信息
 */
export async function autoCommit(commitMsg: string) {
  try {
    const result = execSync(`git commit -m "${commitMsg}"`);
    return 0;
  } catch (e) {
    return -1;
  }
}

// TODO: 看看以后有什么更好的方式提醒用户，目前先打log
export function remindCommiting() {
  console.log('正在提交中...');
}
