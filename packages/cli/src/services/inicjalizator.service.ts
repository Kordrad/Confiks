import { PACKAGES_MAP } from '../packages/packages.const.js';
import { PackagesEnumKeys } from '../type/enums/packages.enum.js';
import { packageManagerService } from './package-menager.service.js';

export class InitializerService {
  private packages: PackagesEnumKeys[] = [];

  addPackages(packages: PackagesEnumKeys[]): void {
    this.packages.push(...packages);
  }

  configureProject(): void {
    this.install();
    this.configure();
  }

  private install(): void {
    for (const packageKey of this.packages) {
      const package_ = PACKAGES_MAP.get(packageKey);
      packageManagerService.addPackage(
        package_.package,
        package_.dependencyType
      );
    }

    packageManagerService.install();
  }

  private configure(): void {
    for (const packageKey of this.packages) {
      const package_ = PACKAGES_MAP.get(packageKey);
      package_.configure?.();
    }
  }
}
