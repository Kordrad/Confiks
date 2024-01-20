import type { DependencyType } from '../types/dependency-type.type.js';
import type {
  Dependency,
  VersionRange,
} from '../types/package-version.type.js';
import type { Package } from '../types/packages.type.js';

export interface PackageInterface {
  readonly package: Package;
  readonly title: string;
  readonly dependencyType: DependencyType;
  readonly version: VersionRange;
  readonly description?: string;
  readonly extensions?: PackageInterface[];
  readonly dependency: Dependency;

  configure?: () => void;
}
