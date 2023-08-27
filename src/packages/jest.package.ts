import { DependencyTypeEnum, PackagesEnumKeys } from '../type/enums';
import { BasePackage } from './base.package';
import { tsJest, typesJest } from './extensions';

class JestPackage extends BasePackage {
  readonly dependencyType: DependencyTypeEnum =
    DependencyTypeEnum.devDependency;
  readonly name: string = '🃏 Jest';
  readonly package: PackagesEnumKeys = 'jest';

  extensions = [tsJest, typesJest];
}

export const jest = new JestPackage();
