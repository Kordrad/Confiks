import { PackageManagerService } from '../services/package-manager/package-manager.service.js';

export const COMMIT_MSG_COMMITLINT = `${new PackageManagerService().exec} --no -- commitlint --edit $\{1}`;
export const PRE_COMMIT_LINT_STAGED = `${new PackageManagerService().exec} lint-staged`;

/*
export const PRE_COMMIT_BIOME_CHECK = 'npx @biomejs/biome check --apply';
export const PRE_COMMIT_BIOME_FORMAT = `npx @biomejs/biome format --write`;
export const PRE_COMMIT_BIOME_LINT = 'npx @biomejs/biome lint';
*/
