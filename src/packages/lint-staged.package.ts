import { huskyService } from '../services/husky.service';
import { DependencyTypeEnum, PackagesEnumKeys } from '../type/enums';
import { packageIsInstalled } from '../utils';
import { BasePackage } from './base.package';
import { husky } from './husky.package';

class LintStagedPackage extends BasePackage {
  readonly name: string = '🚫💩 lint-staged';
  readonly package: PackagesEnumKeys = 'lint-staged';
  readonly dependencyType: DependencyTypeEnum =
    DependencyTypeEnum.devDependency;

  prepare(): void {
    if (!packageIsInstalled(husky.package)) {
      return;
    }
    huskyService.addHook('pre-commit', 'npx lint-staged');
  }
}

export const lintStaged = new LintStagedPackage();
