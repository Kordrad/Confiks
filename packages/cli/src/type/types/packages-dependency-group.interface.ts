import type { DependencyTypeToInstall } from './dependency-type.type.js';
import type { Dependency } from './package-version.type.js';

export type PackagesDependencyGroup = {
  [Key in DependencyTypeToInstall]: Dependency[];
};
