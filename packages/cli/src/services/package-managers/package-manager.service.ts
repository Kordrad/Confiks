import { DependencyTypeEnum } from '../../type/enums/dependency-type.enum.js';
import type { PackagesEnumKeys } from '../../type/enums/packages.enum.js';
import type { PackageManager } from '../../type/interfaces/package-manager.interface.js';
import { fileSystem } from '../node/file-system.service.js';
import { NpmManagerService } from './npm-manager.service.js';
import { PnpmManagerService } from './pnpm-manager.service.js';

export class PackageManagerService {
  private readonly dependencies: PackagesEnumKeys[] = [];
  private readonly devDependencies: PackagesEnumKeys[] = [];
  private readonly global: PackagesEnumKeys[] = [];

  #packageManager: PackageManager = this.#selectPackageManager();

  addPackage(
    packageDependency: PackagesEnumKeys,
    installationType: DependencyTypeEnum
  ): void {
    if (installationType === DependencyTypeEnum.dependency)
      this.dependencies.push(packageDependency);

    if (installationType === DependencyTypeEnum.devDependency)
      this.devDependencies.push(packageDependency);

    if (installationType === DependencyTypeEnum.global)
      this.global.push(packageDependency);
  }

  #selectPackageManager(): PackageManager {
    if (fileSystem.queryFileName('pnpm-lock.yaml'))
      return new PnpmManagerService();

    return new NpmManagerService();
  }

  async install() {
    await this.#packageManager.install({
      dependency: this.dependencies,
      devDependency: this.devDependencies,
      global: this.global,
    });
  }
}
