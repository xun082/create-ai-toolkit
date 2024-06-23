import * as path from 'path';
import * as os from 'os';

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
