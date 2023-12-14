import {
  type DependencyTypeEnum,
  type DependencyTypeEnumKeys,
} from '../enums/dependency-type.enum.js';
import type { PackagesEnumKeys } from '../enums/packages.enum.js';

export interface PackageManager {
  readonly installationType: {
    [key in DependencyTypeEnum]: string;
  };
  install(packages: {
    [Key in DependencyTypeEnumKeys]: PackagesEnumKeys[];
  }): Promise<void>;
}
