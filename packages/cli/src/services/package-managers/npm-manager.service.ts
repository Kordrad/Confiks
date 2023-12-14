/* eslint-disable unicorn/prevent-abbreviations */
import {
  DependencyTypeEnum,
  type DependencyTypeEnumKeys,
} from '../../type/enums/dependency-type.enum.js';
import type { PackagesEnumKeys } from '../../type/enums/packages.enum.js';
import type { PackageManager } from '../../type/interfaces/package-manager.interface.js';
import { childProcess } from '../node/child-process.service.js';

export class NpmManagerService implements PackageManager {
  readonly installationType = {
    [DependencyTypeEnum.dependency]: '--save',
    [DependencyTypeEnum.devDependency]: '--save-dev',
    [DependencyTypeEnum.global]: '--global',
  };
  async install({
    dependency = [],
    devDependency = [],
    global = [],
  }: {
    [Key in DependencyTypeEnumKeys]: [];
  }) {
    await this.#installPackages(dependency, DependencyTypeEnum.dependency);
    await this.#installPackages(
      devDependency,
      DependencyTypeEnum.devDependency
    );
    await this.#installPackages(global, DependencyTypeEnum.global);
  }

  async #installPackages(
    packages: PackagesEnumKeys[],
    installationType: DependencyTypeEnum
  ): Promise<void> {
    if (packages.length === 0) {
      return;
    }
    const type = this.installationType[installationType];
    const dependencies = packages.join(' ');
    await childProcess.execAsync(`npm i ${type} ${dependencies}`);
  }
}
