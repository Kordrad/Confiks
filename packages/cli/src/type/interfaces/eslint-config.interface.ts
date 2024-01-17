type RuleOptions = boolean | 'warn' | 'error' | 'off' | 'on';

type Rule = RuleOptions | [RuleOptions, { [key: string]: boolean | string }];

type Rules = {
  [key in string]: Rule;
};

export interface EslintConfig {
  root?: boolean;
  extends?: string[];
  ignorePatterns?: string[];
  plugins?: string[];
  rules?: Rules;
  overrides?: { files: `${string}.${string}`[]; rules?: Rules }[];
}
