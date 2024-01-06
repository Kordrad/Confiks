/* eslint-disable unicorn/prevent-abbreviations */
/**
 * @see https://www.geeksforgeeks.org/what-is-the-meaning-of-save-for-npm-install/
 * */

export const enum DependencyTypeEnum {
  none,
  dependency,
  devDependency,
  global,
}

export type DependencyTypeEnumKeys = keyof typeof DependencyTypeEnum;
export type DependencyTypeToInstall = Exclude<DependencyTypeEnumKeys, 'none'>;
