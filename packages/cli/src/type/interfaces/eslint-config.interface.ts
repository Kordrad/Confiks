export interface EslintConfig {
  root?: boolean;
  extends?: string[];
  ignorePatterns?: string[];
  plugins?: string[];
  rules?: object;
}
