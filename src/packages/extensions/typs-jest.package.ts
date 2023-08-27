import { DependencyTypeEnum, PackagesEnumKeys } from '../../type/enums';
import { BasePackage } from '../base.package';

class TypesJest extends BasePackage {
  readonly dependencyType: DependencyTypeEnum =
    DependencyTypeEnum.devDependency;
  readonly name: string = '@types/jest';
  readonly package: PackagesEnumKeys = '@types/jest';
}

export const typesJest = new TypesJest();
