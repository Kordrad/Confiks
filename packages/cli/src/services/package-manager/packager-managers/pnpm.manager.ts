import type {
  CLI,
  DependencyInstallation,
  PackageManagerInterface,
} from '../../../type/interfaces/package-manager.interface.js';
import { childProcess } from '../../node/child-process.service.js';
import { PackageManagerAbstract } from './package-manager.abstract.js';

export class PnpmManager
  extends PackageManagerAbstract
  implements PackageManagerInterface
{
  readonly cli: CLI = {
    install: 'pnpm add',
    set: `pnpm pkg set`,
    exec: `pnpm`,
    uninstall: `pnpm remove`,
    init: `pnpm dlx`,
  };

  readonly dependencyInstallation: DependencyInstallation = {
    dependency: '--save-prod',
    devDependency: '--save-dev',
  };

  async init(dependency: string): Promise<void> {
    await childProcess.execAsync2(
      `${this.cli.init} ${this.addCreateWord(dependency)}`,
      {
        stdio: 'inherit',
      }
    );
  }

  private addCreateWord(
    dependency: string
  ): `${string}/create-${string}` | `create-${string}` {
    const value = dependency.split('/');
    if (value.length > 1) return `${value[0]}/create-${value[1]}`;
    return `create-${value[0]}`;
  }
}
