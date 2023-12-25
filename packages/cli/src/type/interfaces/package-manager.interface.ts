import {
  type DependencyTypeEnum,
  type DependencyTypeEnumKeys,
} from '../enums/dependency-type.enum.js';
import type { Dependency } from '../types/package-version.type.js';

export interface PackageManager {
  readonly installationType: {
    [key in DependencyTypeEnum]: string;
  };
  install(packages: {
    [Key in DependencyTypeEnumKeys]: Dependency[];
  }): Promise<void>;
}
