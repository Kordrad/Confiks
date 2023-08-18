import { PackagesEnum, PackagesEnumKeys } from '../enums';
import { BasePackageInterface } from '../interfaces';
import { childProcess } from '../services/node';
import { packageIsInstalled } from '../utils';

export abstract class BasePackage implements BasePackageInterface {
  abstract readonly name: string;
  abstract readonly package: PackagesEnumKeys;

  abstract install(): void;

  get disabled(): string | boolean {
    if (packageIsInstalled(this.name)) {
      return 'Package is already installed';
    }
    return false;
  }

  get value(): PackagesEnum {
    return PackagesEnum[this.package];
  }

  protected installation(type: '-D' | '') {
    childProcess.execSync(`npm i ${type} ${this.package}`);
  }
}
