import type { DependencyTypeEnum } from '../enums/dependency-type.enum.js';
import type { PackagesEnumKeys } from '../enums/packages.enum.js';

export interface PackageInterface {
  readonly package: PackagesEnumKeys;
  readonly title: string;
  readonly dependencyType: DependencyTypeEnum;
  readonly description?: string;
  readonly extensions?: PackageInterface[];

  configure?: () => void;
}
