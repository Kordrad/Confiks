import type { DependencyType } from './dependency-type.type.js';
import type { Dependency } from './package-version.type.js';

export type PackagesDependencyGroup = {
  [Key in DependencyType]: Dependency[];
};
