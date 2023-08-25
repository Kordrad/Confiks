import {
  DependencyTypeEnum,
  PackagesEnum,
  PackagesEnumKeys,
} from '../type/enums';
import { BasePackageInterface } from '../type/interfaces';
import { packageIsInstalled } from '../utils';

export abstract class BasePackage implements BasePackageInterface {
  abstract readonly name: string;
  abstract readonly package: PackagesEnumKeys;
  abstract readonly dependencyType: DependencyTypeEnum;

  get disabled(): string | boolean {
    if (packageIsInstalled(this.name)) {
      return 'Package is already installed';
    }
    return false;
  }

  get value(): PackagesEnum {
    return PackagesEnum[this.package];
  }
}
