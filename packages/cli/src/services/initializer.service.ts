import type { PackageInterface } from '../type/interfaces/package.interface.js';
import { PackageManagerService } from './package-managers/package-manager.service.js';

export class InitializerService {
  packages: PackageInterface[] = [];
  #packageManagerService = new PackageManagerService();

  addPackages(packages: PackageInterface[]): void {
    this.packages.push(...packages);
  }

  async install(): Promise<void> {
    for (const package_ of this.packages) {
      this.#packageManagerService.addPackage(
        package_.package,
        package_.dependencyType
      );
    }

    await this.#packageManagerService.install();
  }

  configure(): Promise<void> {
    return new Promise<void>(resolve => {
      for (const package_ of this.packages) {
        package_.configure?.();
      }
      resolve();
    });
  }
}
