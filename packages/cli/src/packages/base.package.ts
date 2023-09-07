import { DependencyTypeEnum } from '../type/enums/dependency-type.enum.js';
import { PackagesEnumKeys } from '../type/enums/packages.enum.js';
import { BasePackageInterface } from '../type/interfaces/base-package.interface.js';
import { packageIsInstalled } from '../utils/package-json.utils.js';
import { PACKAGES_MAP } from './packages.const.js';

/**
 * This is base abstract class to create new packages that you can install in your project
 *
 * @summary BaseClass to extends packages
 * @example
 * class NewPackage extends BasePackage { ... }
 * */
export abstract class BasePackage implements BasePackageInterface {
  abstract readonly name: string;
  abstract readonly package: PackagesEnumKeys;
  abstract readonly dependencyType: DependencyTypeEnum;

  /**
   *  type string to provides reason why package is disabled to install
   *  @example "Package is already installed"
   * */
  get disabled(): string | boolean {
    if (packageIsInstalled(this.package)) {
      return 'Package is already installed';
    }
    return false;
  }

  /**
   * This is used in the inquirer
   * First usage save our package into our database.
   *
   * inquirer get value to returns in questions,
   * then we can reuse value from answer to get again instance of class
   * PACKAGES_MAP.get('husky') has HuskyPackage
   * */
  get value(): PackagesEnumKeys {
    if (!PACKAGES_MAP.has(this.package)) {
      PACKAGES_MAP.set(this.package, this);
    }
    return this.package;
  }
}
