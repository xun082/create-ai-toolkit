import * as path from 'path';
import { promises as fs } from 'fs';
import * as os from 'os';

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
