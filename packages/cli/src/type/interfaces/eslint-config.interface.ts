type Rule = boolean | string | [string, { [key: string]: boolean | string }];
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
