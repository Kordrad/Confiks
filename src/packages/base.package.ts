import {
  DependencyTypeEnum,
  PackagesEnum,
  PackagesEnumKeys,
} from '../type/enums';
import { BasePackageInterface } from '../type/interfaces';
import { packageIsInstalled } from '../utils';

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
   * Returns ID/Value of PackagesEnum.
   * This is used in the inquirer
   *
   * @example husky => 0 (etc)
   * */
  get value(): PackagesEnum {
    return PackagesEnum[this.package];
  }
}
