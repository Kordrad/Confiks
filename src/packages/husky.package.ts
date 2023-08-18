import { PackagesEnumKeys } from '../enums';
import { childProcess } from '../services/node';
import { BasePackage } from './base.package';

class HuskyPackage extends BasePackage {
  readonly name: string = 'Husky 🐶';
  readonly package: PackagesEnumKeys = 'husky';

  install() {
    this.installation('-D');
  }

  afterInstall(): void {
    childProcess.execSync('npx husky install');
    childProcess.execSync('npm pkg set scripts.prepare="husky install"');
  }
}

export const husky = new HuskyPackage();
