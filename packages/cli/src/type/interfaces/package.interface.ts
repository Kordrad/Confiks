import { DependencyTypeEnum } from '../enums/dependency-type.enum';
import { PackagesEnumKeys } from '../enums/packages.enum';

export interface PackageInterface {
  readonly package: PackagesEnumKeys;
  readonly title: string;
  readonly dependencyType: DependencyTypeEnum;
  readonly description?: string;
  readonly extensions?: PackageInterface[];

  configure?: () => void;
}
