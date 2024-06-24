import { execSync } from 'node:child_process';

export function getFilesChangedInGitAdd() {
  const gitDiff = execSync('git diff --cached --name-only', { encoding: 'utf-8' });
  const files = gitDiff.split('\n');

  // 过滤掉 lock 文件
  const ignoredPatterns = [/package-lock\.json$/, /yarn\.lock$/, /pnpm-lock\.yaml$/];
  return files.filter((file) => file && !ignoredPatterns.some((pattern) => pattern.test(file)));
}

interface Staged {
  filename: string;
  content: string;
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
