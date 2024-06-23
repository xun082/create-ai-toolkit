import { select, text, isCancel } from '@clack/prompts';

import { UserSelection } from '@/types';

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
export async function getUserInput(): Promise<UserSelection | null> {
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

  let cssOptions: { value: string; label: string }[] = [];
  if (framework === 'vue') {
    cssOptions = [
      { value: 'tailwindcss', label: 'Tailwind CSS' },
      { value: 'scss', label: 'SCSS' },
      { value: 'less', label: 'Less' },
      { value: 'stylus', label: 'Stylus' },
    ];
  } else if (framework === 'react') {
    cssOptions = [
      { value: 'tailwindcss', label: 'Tailwind CSS' },
      { value: 'scss', label: 'SCSS' },
      { value: 'less', label: 'Less' },
      { value: 'styled-components', label: 'Styled-components' },
    ];
  }

  const cssOption = await makeSelection('请选择一个CSS选项:', cssOptions);
  if (!cssOption) return null;

  const userInput = await inputDefaultText('请输入该组件的需求:', '创建一个基础的按钮组件');
  if (!userInput) return null;

  return { framework, languageType, cssOption, userInput };
}
