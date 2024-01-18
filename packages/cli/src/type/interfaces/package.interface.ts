import type { DependencyTypeEnum } from '../enums/dependency-type.enum.js';
import type { PackagesKeys } from '../enums/packages.enum.js';
import type {
  Dependency,
  VersionRange,
} from '../types/package-version.type.js';

export interface PackageInterface {
  readonly package: PackagesKeys;
  readonly title: string;
  readonly dependencyType: DependencyTypeEnum;
  readonly version: VersionRange;
  readonly description?: string;
  readonly extensions?: PackageInterface[];
  readonly dependency: Dependency;

  configure?: () => void;
}
