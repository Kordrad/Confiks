import type { PackageInterface } from '../type/interfaces/package.interface.js';
import { packageManagerService } from './package-manager.service.js';

export class InitializerService {
  packages: PackageInterface[] = [];

  addPackages(packages: PackageInterface[]): void {
    this.packages.push(...packages);
  }

  async install(): Promise<void> {
    for (const package_ of this.packages) {
      packageManagerService.addPackage(
        package_.package,
        package_.dependencyType
      );
    }

    await packageManagerService.install();
  }

  async configure(): Promise<void> {
    return new Promise<void>(resolve => {
      for (const package_ of this.packages) {
        package_.configure?.();
      }
      resolve();
    });
  }
}
