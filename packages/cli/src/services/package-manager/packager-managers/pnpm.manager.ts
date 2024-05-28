import type {
  CLI,
  DependencyInstallation,
  PackageManagerInterface,
} from '../../../type/interfaces/package-manager.interface.js';
import type { DependencyTypeToInstall } from '../../../type/types/dependency-type.type.js';
import type { Dependency } from '../../../type/types/package-version.type.js';
import { childProcess } from '../../node/child-process.service.js';

export class PnpmManager implements PackageManagerInterface {
  readonly cli: CLI = {
    install: 'pnpm add',
    set: `pnpm pkg set`,
    exec: `pnpm exec`,
    uninstall: `pnpm remove`,
    init: `pnpm dlx`,
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

  async uninstall(packages: string[]): Promise<void> {
    await childProcess.execAsync(`${this.cli.uninstall} ${packages.join(' ')}`);
  }

  exec(value: string) {
    childProcess.execSync(`${this.cli.exec} ${value}`);
  }

  async init(dependency: string): Promise<void> {
    await childProcess.execAsync(
      `${this.cli.init} ${this.#addCreateWord(dependency)}`,
      {
        stderr: false,
      }
    );
  }

  #addCreateWord(
    dependency: string
  ): `${string}/create-${string}` | `create-${string}` {
    const value = dependency.split('/');
    if (value.length > 1) return `${value[0]}/create-${value[1]}`;
    return `create-${value[0]}`;
  }
}
