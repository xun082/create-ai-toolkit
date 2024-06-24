import { execSync } from 'node:child_process';

export function getFilesChangedInGitAdd() {
  const gitDiff = execSync('git diff --cached --name-only', { encoding: 'utf-8' });
  const files = gitDiff.split('\n');

  // 过滤掉 lock 文件
  const ignoredPatterns = [/package-lock\.json$/, /yarn\.lock$/, /pnpm-lock\.yaml$/];
  const filteredFiles = files.filter(
    (file) => file && !ignoredPatterns.some((pattern) => pattern.test(file)),
  );

  return filteredFiles;
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
export function autoCommit(commitMsg: string) {
  execSync(`git commit -m "${commitMsg}"`);
}
