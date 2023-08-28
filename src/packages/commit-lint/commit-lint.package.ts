import { huskyService } from '../../services/husky.service';
import { DependencyTypeEnum, PackagesEnumKeys } from '../../type/enums';
import { packageIsInstalled } from '../../utils';
import { BasePackage } from '../base.package';
import { husky } from '../husky/husky.package';
import { configConventional } from './config-conventional.package';

/**
 * @see https://commitlint.js.org/#/
 * @see https://www.npmjs.com/package/@commitlint/cli
 * */
class CommitLintPackage extends BasePackage {
  readonly name: string = 'commitLint 📔';
  readonly package: PackagesEnumKeys = '@commitlint/cli';
  readonly extensions = [configConventional];
  readonly dependencyType: DependencyTypeEnum =
    DependencyTypeEnum.devDependency;

  prepare(): void {
    if (!packageIsInstalled(husky.package)) {
      return;
    }
    huskyService.addHook('commit-msg', 'npx --no -- commitlint --edit ${1}');
  }
}

export const commitLint = new CommitLintPackage();
