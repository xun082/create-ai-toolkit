export interface ConfigItem {
  OPEN_AI_KEY: string;
  END_POINT: string;
}

export interface UserSelection {
  framework: string;
  languageType: string;
  cssOption: string;
  userInput: string;
}

export type CustomHooksSelection = Omit<UserSelection, 'cssOption'>;

export interface Staged {
  filename: string;
  content: string;
}
