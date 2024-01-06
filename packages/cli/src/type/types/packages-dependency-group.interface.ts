import type { DependencyTypeToInstall } from '../enums/dependency-type.enum.js';
import type { Dependency } from './package-version.type.js';

export type PackagesDependencyGroup = {
  [Key in DependencyTypeToInstall]: Dependency[];
};
