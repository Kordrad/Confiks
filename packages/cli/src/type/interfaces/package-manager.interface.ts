import { DependencyTypeEnum } from '../enums/dependency-type.enum.js';
import type { PackagesEnumKeys } from '../enums/packages.enum.js';
import type { PackagesDependencyGroup } from '../types/packages-dependency-group.interface.js';

export interface PackageManager {
  readonly installationType: {
    [DependencyTypeEnum.dependency]: string;
    [DependencyTypeEnum.devDependency]: string;
    [DependencyTypeEnum.global]: string;
  };
  install(packages: PackagesDependencyGroup): Promise<void>;
  create(packages: PackagesEnumKeys[]): Promise<void>;
}
