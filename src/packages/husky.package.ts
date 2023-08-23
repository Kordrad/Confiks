import { childProcess } from '../services/node';
import { DependencyTypeEnum, PackagesEnumKeys } from '../type/enums';
import { BasePackage } from './base.package';

class HuskyPackage extends BasePackage {
  readonly name: string = 'Husky 🐶';
  readonly package: PackagesEnumKeys = 'husky';
  readonly dependencyType: DependencyTypeEnum =
    DependencyTypeEnum.devDependency;

  prepare(): void {
    childProcess.execSync('npx husky install');
    childProcess.execSync('npm pkg set scripts.prepare="husky install"');
  }
}

export const husky = new HuskyPackage();
