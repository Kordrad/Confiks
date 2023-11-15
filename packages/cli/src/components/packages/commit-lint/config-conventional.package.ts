import { DependencyTypeEnum } from '../../../type/enums/dependency-type.enum.js';
import { BasePackage } from '../base.package.js';

class ConfigConventionalPackage extends BasePackage {
  readonly title = 'config-conventional';
  readonly package = '@commitlint/config-conventional';
  readonly dependencyType = DependencyTypeEnum.devDependency;
  readonly description =
    'Shareable commitlint config enforcing conventional commits.';
}

export const configConventional = new ConfigConventionalPackage();
