import { huskyService } from '../services/husky.service';
import { DependencyTypeEnum, PackagesEnumKeys } from '../type/enums';
import { packageIsInstalled } from '../utils';
import { BasePackage } from './base.package';
import { configConventional } from './extensions';
import { husky } from './husky.package';

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
