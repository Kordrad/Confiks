import { PackageManagerService } from '../../services/package-manager/package-manager.service.js';
import type { PackageInterface } from '../../type/interfaces/package.interface.js';
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
export abstract class BasePackage implements PackageInterface {
  abstract readonly title: string;
  abstract readonly package: Package;
  abstract readonly version: VersionRange;
  abstract readonly dependencyType: DependencyType;
  readonly #packageManager = new PackageManagerService();

  get dependency(): Dependency {
    return `${this.package}@"${this.version}"`;
  }

  addScripts(scripts: { [kay: string]: string }): void {
    // @example 'scripts.test="echo"'
    const parsedScripts: string = Object.entries(scripts)
      .map(([key, value]) => `scripts.${key}="${value}"`)
      .join(' ');
    this.#packageManager.set(parsedScripts);
  }
}
