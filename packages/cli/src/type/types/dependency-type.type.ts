/* eslint-disable unicorn/prevent-abbreviations */
/**
 * @see https://www.geeksforgeeks.org/what-is-the-meaning-of-save-for-npm-install/
 * */

type DependencyTypes = ['none', 'dependency', 'devDependency', 'global'];

export type DependencyType = DependencyTypes[number];
export type DependencyTypeToInstall = DependencyType[1 | 2 | 3];
