import { huskyService } from '../../../services/husky.service.js';
import { DependencyTypeEnum } from '../../../type/enums/dependency-type.enum.js';
import { packageIsInstalled } from '../../../utils/package-json.utils.js';
import { BasePackage } from '../base.package.js';
import { husky } from '../husky/husky.package.js';
import { configConventional } from './config-conventional.package.js';

/**
 * @see https://commitlint.js.org/#/
 * @see https://www.npmjs.com/package/@commitlint/cli
 * */
class CommitLintPackage extends BasePackage {
  readonly title = 'commitLint 📔';
  readonly package = '@commitlint/cli';
  readonly extensions = [configConventional];
  readonly dependencyType = DependencyTypeEnum.devDependency;
  readonly description = 'Helps your team adhere to a commit convention.';

  configure(): void {
    if (!packageIsInstalled(husky.package)) {
      return;
    }
    huskyService.addHook('commit-msg', 'npx --no -- commitlint --edit ${1}');
  }
}

export const commitLint = new CommitLintPackage();
