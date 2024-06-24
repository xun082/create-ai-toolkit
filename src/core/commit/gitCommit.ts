import { cancel, confirm, outro, text } from '@clack/prompts';

import { autoCommit } from '@/core/commit/help';

async function selectAIMsgOrManualMsg(msg: string) {
  const code = await autoCommit(msg);
  if (code === 0) {
    outro('提交成功');
  } else {
    cancel('提交失败');
  }
}

export default async (aiCommitMsg: string) => {
  const answer = await confirm({
    message: '是否使用以上提交信息？',
    active: '确定',
    inactive: '取消',
  });
  if (answer) {
    console.log('正在提交中。。。');
    await selectAIMsgOrManualMsg(aiCommitMsg);
  } else {
    // 让用户自己手动输入提交信息再提交
    const manualMsg = await text({
      message: '请您手动输入需要的commit信息',
      placeholder: 'commit信息',
    });
    console.log('正在提交中。。。');
    if (typeof manualMsg === 'string' && manualMsg) {
      await selectAIMsgOrManualMsg(manualMsg as string);
    }
  }
};
