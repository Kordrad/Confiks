/**
 * @see https://www.geeksforgeeks.org/what-is-the-meaning-of-save-for-npm-install/
 * */

export const enum DependencyTypeEnum {
  dependency = '--save', // -S
  // eslint-disable-next-line unicorn/prevent-abbreviations
  devDependency = '--save-dev', // -D
  global = '--global', // -g
}
