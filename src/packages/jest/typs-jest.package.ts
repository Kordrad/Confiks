import { DependencyTypeEnum, PackagesEnumKeys } from '../../type/enums';
import { BasePackage } from '../base.package';

/**
 * @see https://www.npmjs.com/package/@types/jest
 * */
class TypesJest extends BasePackage {
  readonly dependencyType: DependencyTypeEnum =
    DependencyTypeEnum.devDependency;
  readonly name: string = '@types/jest';
  readonly package: PackagesEnumKeys = '@types/jest';
}

export const typesJest = new TypesJest();
