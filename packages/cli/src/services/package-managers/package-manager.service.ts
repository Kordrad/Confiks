import type { PackagesEnumKeys } from '../../type/enums/packages.enum.js';
import type { PackageManager } from '../../type/interfaces/package-manager.interface.js';
import type { PackagesDependencyGroup } from '../../type/types/packages-dependency-group.interface.js';
import { fileSystem } from '../node/file-system.service.js';
import { NpmService } from './npm.service.js';
import { PnpmService } from './pnpm.service.js';

export class PackageManagerService {
  #packageManager: PackageManager = this.#selectPackageManager();

  async install(packages: PackagesDependencyGroup) {
    await this.#packageManager.install(packages);
  }

  async create(packages: PackagesEnumKeys[]): Promise<void> {
    await this.#packageManager.create(packages);
  }

  #selectPackageManager(): PackageManager {
    if (fileSystem.queryFileName('pnpm-lock.yaml')) return new PnpmService();

    return new NpmService();
  }
}
