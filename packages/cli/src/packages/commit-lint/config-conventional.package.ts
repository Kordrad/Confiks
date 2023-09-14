import { DependencyTypeEnum } from '../../type/enums/dependency-type.enum.js';
import { BasePackage } from '../base.package.js';

class ConfigConventionalPackage extends BasePackage {
  readonly name = 'config-conventional';
  readonly package = '@commitlint/config-conventional';
  readonly dependencyType = DependencyTypeEnum.devDependency;
}

export const configConventional = new ConfigConventionalPackage();
