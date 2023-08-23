export enum PackagesEnum {
  husky,
  '@commitlint/cli',
  '@commitlint/config-conventional',
  'lint-staged',
}

export type PackagesEnumKeys = keyof typeof PackagesEnum;
