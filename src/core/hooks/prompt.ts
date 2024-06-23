import { CustomHooksSelection, UserSelection } from '@/types';

function generatorComponentPrompt({
  framework,
  languageType,
  userInput,
}: CustomHooksSelection): string {
  return `
    请根据以下信息生成一个自定义的 Hook：

    框架：${framework}
    编程语言: ${languageType}

    描述：${userInput}

    要求：提供完整的代码实现、Hook 定义、状态管理（如果适用）、以及 TypeDoc 注释，TypeDoc 注释包括要求包括使用实例。
    确保生成的代码能够通过 TypeScript 的类型检查，最终只返回代码给我就可以了。
    `;
}

export { generatorComponentPrompt };
