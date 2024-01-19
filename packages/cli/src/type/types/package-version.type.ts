import type { Package } from '../types/packages.type.js';

type Tag =
  | `${number}`
  | `${number}.${number}`
  | `${number}.${number}.${number}`
  | 'latest';

/*
 * @see https://docs.npmjs.com/cli/v8/commands/npm-install
 * */
export type VersionRange = Tag | `${Tag} - ${Tag}`;
export type Dependency = `${Package}@"${VersionRange}"`;
