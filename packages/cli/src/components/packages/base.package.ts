import type { DependencyTypeEnum } from '../../type/enums/dependency-type.enum.js';
import type { PackagesEnumKeys } from '../../type/enums/packages.enum.js';
import type { PackageInterface } from '../../type/interfaces/package.interface.js';
import type {
  Dependency,
  VersionRange,
} from '../../type/types/package-version.type.js';

/**
 * This is base abstract class to create new packages that you can install in your project
 *
 * @summary BaseClass to extends packages
 * @example
 * class NewPackage extends BasePackage { ... }
 * */
export abstract class BasePackage implements PackageInterface {
  abstract readonly title: string;
  abstract readonly package: PackagesEnumKeys;
  abstract readonly version: VersionRange;
  abstract readonly dependencyType: DependencyTypeEnum;

  get dependency(): Dependency {
    return `${this.package}@"${this.version}"`;
  }
}
