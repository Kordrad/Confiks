/* eslint-disable unicorn/prevent-abbreviations */
import type {
  CLI,
  PackageManagerInterface,
} from '../../type/interfaces/package-manager.interface.js';
import type { PackagesDependencyGroup } from '../../type/types/packages-dependency-group.interface.js';
import { detectPackageManager } from '../../utils/package-manager.utils.js';
import { PackagerFactory } from './packager.factory.js';

export class PackageManagerService {
  #packageManager: PackageManagerInterface =
    new PackagerFactory().createPackagerManager(detectPackageManager());

  get cli(): CLI {
    return this.#packageManager.cli;
  }

  async install({
    dependency = [],
    devDependency = [],
  }: PackagesDependencyGroup) {
    if (dependency.length > 0)
      await this.#packageManager.install(dependency, 'dependency');
    if (devDependency.length > 0)
      await this.#packageManager.install(devDependency, 'devDependency');
  }

  async init(packages: string[]): Promise<void> {
    for (const _package of packages)
      try {
        await this.#packageManager.init(_package);
      } catch (error) {
        console.error(error);
      }
  }

  async uninstall(packages: string[]): Promise<void> {
    await this.#packageManager.uninstall(packages);
  }

  set(value: string): void {
    this.#packageManager.set(value);
  }

  exec(value: string): void {
    this.#packageManager.exec(value);
  }
}
