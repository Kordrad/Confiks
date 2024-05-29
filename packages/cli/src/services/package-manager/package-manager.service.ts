/* eslint-disable unicorn/prevent-abbreviations */
import type {
  CLI,
  PackageManagerInterface,
} from '../../type/interfaces/package-manager.interface.js';
import type { DependencyTypeToInstall } from '../../type/types/dependency-type.type.js';
import type { Dependency } from '../../type/types/package-version.type.js';
import type { PackagesDependencyGroup } from '../../type/types/packages-dependency-group.interface.js';
import { detectPackageManager } from '../../utils/package-manager.utils.js';
import { PackagerFactory } from './packager.factory.js';

export class PackageManagerService
  implements
    Omit<
      PackageManagerInterface,
      'dependencyInstallation' | 'init' | 'install'
    >
{
  #packageManager: PackageManagerInterface =
    new PackagerFactory().createPackagerManager(detectPackageManager());

  get cli(): CLI {
    return this.#packageManager.cli;
  }

  // Provided methods
  readonly set = (value: string): void => this.#packageManager.set(value);
  readonly exec = (value: string): void => this.#packageManager.exec(value);
  readonly uninstall = async (packages: string[]): Promise<void> =>
    await this.#packageManager.uninstall(packages);

  // End Provided methods

  async init(packages: string[]): Promise<void> {
    for (const _package of packages)
      try {
        await this.#packageManager.init(_package);
      } catch (error) {
        console.error(error);
      }
  }

  async install({
    dependency = [],
    devDependency = [],
  }: PackagesDependencyGroup): Promise<void> {
    await this.installPackages(dependency, 'dependency');
    await this.installPackages(devDependency, 'devDependency');
  }

  private async installPackages(
    packages: Dependency[],
    type: DependencyTypeToInstall
  ): Promise<void> {
    if (packages.length > 0) {
      try {
        await this.#packageManager.install(packages, type);
      } catch (error) {
        console.error(error);
      }
    }
  }
}
