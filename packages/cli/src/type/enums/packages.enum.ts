export enum PackagesEnum {
  'husky',
  '@commitlint/cli',
  '@commitlint/config-conventional',
  'lint-staged',
  'pretty-quick',
  'prettier',
  '@types/jest',
}

export type PackagesEnumKeys = keyof typeof PackagesEnum;
