import type { PackagesKeys } from '../enums/packages.enum.js';

type Tag =
  | `${number}`
  | `${number}.${number}`
  | `${number}.${number}.${number}`
  | 'latest';

/*
 * @see https://docs.npmjs.com/cli/v8/commands/npm-install
 * */
export type VersionRange = Tag | `${Tag} - ${Tag}`;
export type Dependency = `${PackagesKeys}@"${VersionRange}"`;
