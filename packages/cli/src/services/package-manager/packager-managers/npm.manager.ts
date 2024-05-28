import type {
  CLI,
  DependencyInstallation,
  PackageManagerInterface,
} from '../../../type/interfaces/package-manager.interface.js';
import type { DependencyTypeToInstall } from '../../../type/types/dependency-type.type.js';
import type { Dependency } from '../../../type/types/package-version.type.js';
import { childProcess } from '../../node/child-process.service.js';

export class NpmManager implements PackageManagerInterface {
  readonly cli: CLI = {
    install: 'npm i',
    set: `npm pkg set`,
    exec: `npm exec`,
    uninstall: `npm uninstall`,
    init: `npm init`,
  };

  readonly dependencyInstallation: DependencyInstallation = {
    dependency: '--save-prod',
    devDependency: '--save-dev',
  };

  async install(
    packages: Dependency[],
    type: DependencyTypeToInstall
  ): Promise<void> {
    await childProcess.execAsync(
      `${this.cli.install} ${this.dependencyInstallation[type]} ${packages.join(' ')}`
    );
  }

  set(value: string): void {
    childProcess.execSync(`${this.cli.set} ${value}`);
  }

  exec(value: string) {
    childProcess.execSync(`${this.cli.exec} ${value}`);
  }

  async uninstall(packages: string[]): Promise<void> {
    await childProcess.execAsync(`${this.cli.uninstall} ${packages.join(' ')}`);
  }

  async init(dependency: string): Promise<void> {
    await childProcess.execAsync(`${this.cli.init} ${dependency}`, {
      stderr: false,
    });
  }
}
