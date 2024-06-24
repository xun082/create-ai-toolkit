import { cancel, confirm, outro, text } from '@clack/prompts';

import { autoCommit } from '@/core/commit/help';

export default async (aiCommitMsg: string) => {
  const answer = await confirm({
    message: '是否使用以上提交信息？',
    active: '确定',
    inactive: '取消',
  });
  if (answer) {
    const code = await autoCommit(aiCommitMsg);
    if (code === 0) {
      outro('提交成功');
    } else {
      cancel('提交失败');
    }
  } else {
    // 让用户自己手动输入提交信息再提交
    const msg = await text({ message: 'commit信息', placeholder: '请输入commit信息' });
    console.log(msg);
  }
};
