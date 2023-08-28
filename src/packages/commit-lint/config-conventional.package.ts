import { DependencyTypeEnum, PackagesEnumKeys } from '../../type/enums';
import { BasePackage } from '../base.package';

class ConfigConventionalPackage extends BasePackage {
  readonly name = 'config-conventional';
  readonly package: PackagesEnumKeys = '@commitlint/config-conventional';
  readonly dependencyType: DependencyTypeEnum =
    DependencyTypeEnum.devDependency;
}

export const configConventional = new ConfigConventionalPackage();
