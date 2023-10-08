import { DependencyTypeEnum } from '../type/enums/dependency-type.enum.js';
import { PackagesEnumKeys } from '../type/enums/packages.enum.js';
import { childProcess } from './node/child-process.service.js';

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

  async install() {
    await this.installPackages(
      this.dependencies,
      DependencyTypeEnum.dependency
    );
    await this.installPackages(
      this.devDependencies,
      DependencyTypeEnum.devDependency
    );
    await this.installPackages(this.global, DependencyTypeEnum.global);
  }

  private async installPackages(
    packages: PackagesEnumKeys[],
    installationType: DependencyTypeEnum
  ): Promise<void> {
    if (packages.length === 0) {
      return;
    }
    await childProcess.execAsync(
      `npm install ${installationType} ${packages.join(' ')}` // --dry-run
    );
  }
}

export const packageManagerService = new PackageManagerService();
