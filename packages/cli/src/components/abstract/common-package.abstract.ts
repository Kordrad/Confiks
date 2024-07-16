import type { CommonPackageInterface } from '../../type/interfaces/package.interface.js';
import type { DependencyType } from '../../type/types/dependency-type.type.js';
import type {
  Dependency,
  VersionRange,
} from '../../type/types/package-version.type.js';
import type { Package } from '../../type/types/packages.type.js';

/**
 * This is base abstract class to create new packages that you can install in your project
 *
 * @summary BaseClass to extends packages
 * @example
 * class NewPackage extends BasePackage { ... }
 * */
export abstract class CommonPackageAbstract implements CommonPackageInterface {
  abstract readonly title: string;
  abstract readonly package: Package;
  abstract readonly version: VersionRange;
  abstract readonly dependencyType: DependencyType;

  get dependency(): Dependency {
    return `${this.package}@"${this.version}"`;
  }
}
