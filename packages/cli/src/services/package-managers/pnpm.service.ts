/* eslint-disable unicorn/prevent-abbreviations */
import { DependencyTypeEnum } from '../../type/enums/dependency-type.enum.js';
import type { PackagesEnumKeys } from '../../type/enums/packages.enum.js';
import type { PackageManager } from '../../type/interfaces/package-manager.interface.js';
import type { Dependency } from '../../type/types/package-version.type.js';
import type { PackagesDependencyGroup } from '../../type/types/packages-dependency-group.interface.js';
import { childProcess } from '../node/child-process.service.js';

export class PnpmService implements PackageManager {
  readonly installationType = {
    [DependencyTypeEnum.dependency]: '',
    [DependencyTypeEnum.devDependency]: '-D',
    [DependencyTypeEnum.global]: '-g',
  };

  async create(packages: PackagesEnumKeys[]): Promise<void> {
    for (const _package of packages)
      try {
        await childProcess.execAsync(`pnpm create ${_package}`, {
          stderr: false,
        });
      } catch (error) {
        console.error(error);
      }
  }

  async uninstall(packages: string[]): Promise<void> {
    const dependencies = packages.join(' ');
    await childProcess.execAsync(`pnpm remove ${dependencies}`);
  }

  async install({
    dependency = [],
    devDependency = [],
    global = [],
  }: PackagesDependencyGroup) {
    await this.#installPackages(dependency, DependencyTypeEnum.dependency);
    await this.#installPackages(
      devDependency,
      DependencyTypeEnum.devDependency
    );
    await this.#installPackages(global, DependencyTypeEnum.global);
  }

  async #installPackages(
    packages: Dependency[],
    installationType: DependencyTypeEnum
  ): Promise<void> {
    if (packages.length === 0) {
      return;
    }
    const type = this.installationType[installationType];
    const dependencies = packages.join(' ');
    await childProcess.execAsync(`pnpm add ${type} ${dependencies}`);
  }
}
