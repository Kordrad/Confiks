type Rule = boolean | string | [string, { [key: string]: boolean | string }];
export interface EslintConfig {
  root?: boolean;
  extends?: string[];
  ignorePatterns?: string[];
  plugins?: string[];
  rules?: {
    [key: string]: Rule;
  };
}
