import { DependencyTypeEnum } from '../../../type/enums/dependency-type.enum.js';
import { BasePackage } from '../base.package.js';

export class ConfigConventionalPackage extends BasePackage {
  readonly title = 'config-conventional';
  readonly package = '@commitlint/config-conventional';
  readonly version = '18';
  readonly dependencyType = DependencyTypeEnum.devDependency;
  readonly description =
    'Shareable commit-lint config enforcing conventional commits.';
}
