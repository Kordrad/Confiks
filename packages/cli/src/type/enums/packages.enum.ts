export enum PackagesEnum {
  '@commitlint/cli',
  '@commitlint/config-conventional',
  'eslint',
  'eslint-plugin-prettier',
  'eslint-plugin-simple-import-sort',
  'eslint-plugin-unicorn',
  'eslint-plugin-unused-imports',
  'husky',
  'lint-staged',
  'prettier',
  'prettier-plugin-organize-attributes',
  'pretty-quick',
  'stylelint',
  'stylelint-config-standard-scss',
}

export type PackagesEnumKeys = keyof typeof PackagesEnum;
