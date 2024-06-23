/** @type {import("eslint").Linter.Config} */

module.exports = {
  env: {
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  overrides: [
    {
      env: {
        node: true,
      },
      files: ['.eslintrc.cjs'],
      parserOptions: {
        sourceType: 'script',
      },
    },
    {
      files: ['rollup.config.js'],
      parserOptions: {
        sourceType: 'script',
      },
      rules: {
        '@typescript-eslint/no-var-requires': 'off',
      },
    },
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: ['tsconfig.json'], // 确保只针对 ts 文件
    tsconfigRootDir: __dirname,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint', 'import', 'prettier'],
  rules: {
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-var-requires': 'off',
    'no-undef': 0,

    'no-multiple-empty-lines': ['error', { max: 1 }],
    'no-var': 2, // 禁止使用 var 声明变量
    'prefer-rest-params': 2, // 要求使用剩余参数而不是 arguments
    eqeqeq: 2, // 强制使用 === 和 !==
    'no-multi-spaces': 1, // 禁止使用多个空格
    'default-case': 1, // 要求 switch 语句中有 default 分支
    'no-dupe-args': 2, // 禁止 function 定义中出现重名参数
    'prettier/prettier': ['error', { endOfLine: 'lf' }],
    'import/order': [
      2,
      {
        groups: [['builtin', 'external', 'internal'], 'parent', 'sibling', 'index'],
        'newlines-between': 'always',
      },
    ],
  },
};
