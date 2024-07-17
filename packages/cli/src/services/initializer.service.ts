import { AngularSchematicsAbstract } from '../components/abstract/angular-schematics.abstract.js';
import { CommonPackageAbstract } from '../components/abstract/common-package.abstract.js';
import { CreatorPackageAbstract } from '../components/abstract/creator-package.abstract.js';
import type { PackageInterface } from '../type/interfaces/package.interface.js';
import type { PackagesDependencyGroup } from '../type/types/packages-dependency-group.interface.js';
import { childProcess } from './node/child-process.service.js';
import { PackageManagerService } from './package-manager/package-manager.service.js';

export class InitializerService {
  readonly common: CommonPackageAbstract[] = [];
  readonly angularSchematics: AngularSchematicsAbstract[] = [];
  readonly creator: CreatorPackageAbstract[] = [];

  get packages(): PackageInterface[] {
    return [...this.common, ...this.angularSchematics, ...this.creator];
  }
  #packageManagerService = new PackageManagerService();

  addPackages(
    packages: (
      | CommonPackageAbstract
      | AngularSchematicsAbstract
      | CreatorPackageAbstract
      | PackageInterface
    )[]
  ): void {
    for (const _package of packages) {
      switch (true) {
        case _package instanceof CommonPackageAbstract: {
          this.common.push(_package);
          break;
        }
        case _package instanceof AngularSchematicsAbstract: {
          this.angularSchematics.push(_package);
          break;
        }
        case _package instanceof CreatorPackageAbstract: {
          this.creator.push(_package);
          break;
        }
        default: {
          throw new Error(`Wrong instance implementation of ${_package.title}`);
        }
      }
    }
  }

  async install(): Promise<void> {
    const packagesToInstall: PackagesDependencyGroup = {
      dependency: [],
      devDependency: [],
    };

    for (const package_ of this.common) {
      switch (package_.dependencyType) {
        case 'dependency': {
          packagesToInstall.dependency.push(package_.dependency);
          break;
        }
        case 'devDependency': {
          packagesToInstall.devDependency.push(package_.dependency);
          break;
        }
      }
    }

    await this.#packageManagerService.install(packagesToInstall);
    await this.#packageManagerService.init(this.creator.map(_ => _.package));
    await this.#addAngularSchematics();
  }

  configure(): Promise<void> {
    return new Promise<void>(resolve => {
      const preconfigure = this.packages.filter(
        _package => typeof _package.preconfigure === 'function'
      );
      const configure = this.packages.filter(
        _package => typeof _package.configure === 'function'
      );
      const postconfigure = this.packages.filter(
        _package => typeof _package.postconfigure === 'function'
      );

      for (const package_ of preconfigure) package_.preconfigure?.();
      for (const package_ of configure) package_.configure?.();
      for (const package_ of postconfigure) package_.postconfigure?.();

      resolve();
    });
  }

  async #addAngularSchematics(): Promise<void> {
    const result = Promise.resolve();
    for (const schematic of this.angularSchematics) {
      childProcess.exec(`ng add ${schematic.package}`).then();
    }
    return result;
  }
}
