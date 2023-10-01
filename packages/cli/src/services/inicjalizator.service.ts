import { PACKAGES_MAP } from '../packages/packages.const.js';
import { PackagesEnumKeys } from '../type/enums/packages.enum.js';
import { BasePackageInterface } from '../type/interfaces/base-package.interface';
import { packageManagerService } from './package-menager.service.js';

export class InitializerService {
  private packages: BasePackageInterface[] = [];

  addPackages(packages: PackagesEnumKeys[]): void {
    this.packages.push(
      ...packages.map(packageKey => PACKAGES_MAP.get(packageKey))
    );
  }

  configureProject(): void {
    this.install();
    this.configure();
  }

  private install(): void {
    for (const package_ of this.packages) {
      packageManagerService.addPackage(
        package_.package,
        package_.dependencyType
      );
    }

    packageManagerService.install();
  }

  private configure(): void {
    for (const package_ of this.packages) {
      package_.configure?.();
    }
  }
}
