import { UserSelection } from '@/types';

function generatorComponentPrompt({
  framework,
  languageType,
  cssOption,
  userInput,
}: UserSelection): string {
  const cssPreset = cssOption === 'less' || cssOption === 'scss';

  const cssRequirement = cssPreset
    ? `要求：CSS代码和组件代码抽离出来，需要在组件里面引入，CSS代码的文件名应该是 index.module.${cssOption}，生成的代码要求 css 的在最后，js的在最前面`
    : '';

  return `请根据以下信息生成一个${languageType}组件：
    框架：${framework}
    CSS预处理器：${cssPreset ? `${cssOption} module` : cssOption}
    描述：这是一个基于${framework}框架的组件，使用${languageType}编写。
    功能：${userInput}
    要求：提供详细的代码示例，包括必要的导入、组件定义、状态管理（如果适用）、以及基本的样式。
    请注意，不能再代码块里面添加文件名的注释，我不需要文件名
    ${cssRequirement}
    要求：生成的代码应该符合TypeScript的类型检查要求，并且只返回代码部分，不要包含其他任何描述信息。代码中不需要携带有文件名的注释。`;
}

export { generatorComponentPrompt };
