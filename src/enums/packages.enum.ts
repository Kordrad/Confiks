export enum PackagesEnum {
  husky,
  '@commitlint/cli',
  '@commitlint/config-conventional',
}

export type PackagesEnumKeys = keyof typeof PackagesEnum;
