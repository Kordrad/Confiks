import { DependencyTypeEnum, PackagesEnum, PackagesEnumKeys } from '../enums';

export interface BasePackageInterface {
  readonly package: PackagesEnumKeys;
  readonly value: PackagesEnum;
  readonly name: string;
  readonly dependencyType: DependencyTypeEnum;
  readonly extensions?: BasePackageInterface[];

  disabled: boolean | string; // string as reason
  prepare?: () => void;
}
