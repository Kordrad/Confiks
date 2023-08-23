import { PackagesEnumKeys } from '../type/enums';
import { DependencyTypeEnum } from '../type/enums/dependency-type.enum';
import { childProcess } from './node';

class PackageManagerService {
  private readonly dependencies: PackagesEnumKeys[] = [];
  private readonly devDependencies: PackagesEnumKeys[] = [];
  private readonly global: PackagesEnumKeys[] = [];

  addPackage(
    packageDependency: PackagesEnumKeys,
    installationType: DependencyTypeEnum
  ): void {
    if (installationType === DependencyTypeEnum.dependency) {
      this.dependencies.push(packageDependency);
    }
    if (installationType === DependencyTypeEnum.devDependency) {
      this.devDependencies.push(packageDependency);
    }

    if (installationType === DependencyTypeEnum.global) {
      this.global.push(packageDependency);
    }
  }

  install() {
    this.installPackages(this.dependencies, DependencyTypeEnum.dependency);
    this.installPackages(
      this.devDependencies,
      DependencyTypeEnum.devDependency
    );
    this.installPackages(this.global, DependencyTypeEnum.global);
  }

  private installPackages(
    packages: PackagesEnumKeys[],
    installationType: DependencyTypeEnum
  ): void {
    if (packages.length > 0) {
      childProcess.execSync(
        `npm install ${installationType} ${packages.join(' ')}` // --dry-run
      );
    }
  }
}

export const packageManagerService = new PackageManagerService();
