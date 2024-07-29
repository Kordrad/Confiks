import type { DependencyType } from '../types/dependency-type.type.js';
import type {
  Dependency,
  VersionRange,
} from '../types/package-version.type.js';
import type { Package } from '../types/packages.type.js';

export interface PackageInterface {
  readonly title: string;
  readonly description?: string;
  readonly package: Package;
  readonly extensions?: PackageInterface[];

  preconfigure?: () => void;
  configure?: () => void;
  postconfigure?: () => void;
}

export interface CommonPackageInterface extends PackageInterface {
  readonly version: VersionRange;
  readonly dependencyType: DependencyType;
  readonly dependency: Dependency;
}

export type CreatorPackageInterface = PackageInterface;

export type AngularSchematicInterface = PackageInterface;
