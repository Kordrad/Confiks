import type { PackageInterface } from '../type/interfaces/package.interface.js';
import type { Package } from '../type/types/packages.type.js';
import type { PackagesDependencyGroup } from '../type/types/packages-dependency-group.interface.js';
import { PackageManagerService } from './package-manager/package-manager.service.js';

export class InitializerService {
  packages: PackageInterface[] = [];
  #packageManagerService = new PackageManagerService();

  addPackages(packages: PackageInterface[]): void {
    this.packages.push(...packages);
  }

  async install(): Promise<void> {
    const packagesToInstall: PackagesDependencyGroup = {
      dependency: [],
      devDependency: [],
      global: [],
    };
    const packagesToInit: Package[] = [];

    for (const package_ of this.packages) {
      switch (package_.dependencyType) {
        case 'dependency': {
          packagesToInstall.dependency.push(package_.dependency);
          break;
        }
        case 'devDependency': {
          packagesToInstall.devDependency.push(package_.dependency);
          break;
        }
        case 'global': {
          packagesToInstall.global.push(package_.dependency);
          break;
        }
        case 'none': {
          packagesToInit.push(package_.package);
          break;
        }
      }
    }

    await this.#packageManagerService.install(packagesToInstall);
    await this.#packageManagerService.create(packagesToInit);
  }

  configure(): Promise<void> {
    return new Promise<void>(resolve => {
      const preconfigure: PackageInterface[] = [];
      const configure: PackageInterface[] = [];
      const postconfigure: PackageInterface[] = [];
      for (const package_ of this.packages) {
        if (typeof package_.preconfigure === 'function')
          preconfigure.push(package_);
        if (typeof package_.configure === 'function') configure.push(package_);
        if (typeof package_.postconfigure === 'function')
          postconfigure.push(package_);
      }

      for (const package_ of preconfigure) package_.preconfigure?.();
      for (const package_ of configure) package_.configure?.();
      for (const package_ of postconfigure) package_.postconfigure?.();

      resolve();
    });
  }
}
