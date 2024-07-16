import type {
  CLI,
  DependencyInstallation,
  PackageManagerInterface,
} from '../../../type/interfaces/package-manager.interface.js';
import type { DependencyType } from '../../../type/types/dependency-type.type.js';
import type { Dependency } from '../../../type/types/package-version.type.js';
import { childProcess } from '../../node/child-process.service.js';

export abstract class PackageManagerAbstract
  implements Pick<PackageManagerInterface, 'cli' | 'dependencyInstallation'>
{
  abstract readonly cli: CLI;
  abstract readonly dependencyInstallation: DependencyInstallation;

  async install(packages: Dependency[], type: DependencyType): Promise<void> {
    await childProcess.execAsync(
      `${this.cli.install} ${this.dependencyInstallation[type]} ${packages.join(' ')}`
    );
  }

  set(value: string): void {
    childProcess.execSync(`${this.cli.set} ${value}`);
  }

  exec(value: string): void {
    childProcess.execSync(`${this.cli.exec} ${value}`);
  }

  async uninstall(packages: string[]): Promise<void> {
    await childProcess.execAsync(`${this.cli.uninstall} ${packages.join(' ')}`);
  }

  async init(dependency: string): Promise<void> {
    await childProcess.execAsync2(`${this.cli.init} ${dependency}`, {
      stdio: 'inherit',
    });
  }
}
