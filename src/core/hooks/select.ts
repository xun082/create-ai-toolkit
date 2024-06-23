import { select, text, isCancel } from '@clack/prompts';

import { CustomHooksSelection } from '@/types';

// 通用的选择函数
async function makeSelection(
  message: string,
  options: { value: string; label: string }[],
): Promise<string | null> {
  const selection = await select({ message, options });

  if (isCancel(selection)) {
    console.log('操作已取消');
    return null;
  }

  return selection as string;
}

// 提供输入框
async function inputDefaultText(message: string, defaultValue: string): Promise<string | null> {
  const input = await text({ message, defaultValue });

  if (isCancel(input)) {
    console.log('操作已取消');
    return null;
  }

  return input;
}

// 主函数
export async function getUserInput(): Promise<CustomHooksSelection | null> {
  const frameworkOptions = [
    { value: 'react', label: 'React' },
    { value: 'vue', label: 'Vue' },
    { value: 'angular', label: 'Angular' },
  ];

  const languageTypeOptions = [
    { value: 'JavaScript', label: 'JavaScript' },
    { value: 'TypeScript', label: 'TypeScript' },
  ];

  const framework = await makeSelection('请选择一个框架:', frameworkOptions);
  if (!framework) return null;

  const languageType = await makeSelection('请选择语言类型:', languageTypeOptions);
  if (!languageType) return null;

  const userInput = await inputDefaultText('请输入该自定义的需求:', '创建一个基础的按钮组件');
  if (!userInput) return null;

  return { framework, languageType, userInput };
}
