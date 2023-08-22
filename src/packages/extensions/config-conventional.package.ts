import { PackagesEnumKeys } from '../../enums';
import { BasePackage } from '../base.package';

class ConfigConventionalPackage extends BasePackage {
  readonly name = 'config-conventional';
  readonly package: PackagesEnumKeys = '@commitlint/config-conventional';

  install() {
    this.installation('-D');
  }
}

export const configConventional = new ConfigConventionalPackage();
