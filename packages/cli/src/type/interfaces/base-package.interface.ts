import { DependencyTypeEnum } from '../enums/dependency-type.enum';
import { PackagesEnumKeys } from '../enums/packages.enum';

export interface BasePackageInterface {
  readonly package: PackagesEnumKeys;
  readonly value: PackagesEnumKeys;
  readonly name: string;
  readonly dependencyType: DependencyTypeEnum;
  readonly extensions?: BasePackageInterface[];

  disabled: boolean | string; // string as reason
  configure?: () => void;
}
