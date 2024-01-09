/* eslint-disable unicorn/prevent-abbreviations */
import { InstallationType } from '../../type/enums/installation-type.enum.js';
import type { PackagesEnumKeys } from '../../type/enums/packages.enum.js';
import type { Dependency } from '../../type/types/package-version.type.js';
import type { PackagesDependencyGroup } from '../../type/types/packages-dependency-group.interface.js';
import { childProcess } from '../node/child-process.service.js';
import { fileSystem } from '../node/file-system.service.js';

// @Todo add support for YARN
type PackageManager = 'npm' | 'pnpm';

export class PackageManagerService {
  #packageManager: PackageManager = this.#selectPackageManager();

  async install({
    dependency = [],
    devDependency = [],
    global = [],
  }: PackagesDependencyGroup) {
    await this.#installPackages(dependency, InstallationType.dependency);
    await this.#installPackages(
      devDependency,
      InstallationType.developmentDependency
    );
    await this.#installPackages(global, InstallationType.global);
  }

  async create(packages: PackagesEnumKeys[]): Promise<void> {
    for (const _package of packages)
      try {
        await childProcess.execAsync(
          `${this.#packageManager} create ${_package}`,
          {
            stderr: false,
          }
        );
      } catch (error) {
        console.error(error);
      }
  }

  async uninstall(packages: string[]): Promise<void> {
    const dependencies = packages.join(' ');
    await childProcess.execAsync(
      `${this.#packageManager} remove ${dependencies}`
    );
  }

  #selectPackageManager(): PackageManager {
    if (fileSystem.queryFileName('pnpm-lock.yaml')) return 'pnpm';
    return 'npm';
  }

  async #installPackages(
    packages: Dependency[],
    type: InstallationType
  ): Promise<void> {
    if (packages.length === 0) {
      return;
    }
    const dependencies = packages.join(' ');
    await childProcess.execAsync(
      `${this.#packageManager} add ${type} ${dependencies}`
    );
  }
}
