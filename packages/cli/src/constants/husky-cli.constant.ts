import { PackageManagerService } from '../services/package-manager/package-manager.service.js';

const CLI = new PackageManagerService().cli;

export const COMMIT_MSG_COMMITLINT = `${CLI.exec} --no -- commitlint --edit $\{1}`;
export const PRE_COMMIT_LINT_STAGED = `${CLI.exec} lint-staged`;
