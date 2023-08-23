/* eslint-disable unicorn/prevent-abbreviations */
/**
 * @see https://www.geeksforgeeks.org/what-is-the-meaning-of-save-for-npm-install/
 * */

export const enum DependencyTypeEnum {
  dependency = '--save', // -S
  devDependency = '--save-dev', // -D
  global = '--global', // -g
}
