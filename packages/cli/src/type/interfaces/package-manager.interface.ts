import type { DependencyType } from '../types/dependency-type.type.js';
import type { Dependency } from '../types/package-version.type.js';

export type DependencyInstallation = {
  readonly [key in DependencyType]: string;
};

type _CLI = 'install' | 'set' | 'exec' | 'uninstall' | 'init';

export type CLI = {
  readonly [key in _CLI]: string;
};
export interface PackageManagerInterface {
  readonly cli: CLI;
  readonly dependencyInstallation: DependencyInstallation;

  /**
   * installation command
   * @example install('confiks', 'devDependency')
   */
  install(packages: Dependency[], type: DependencyType): Promise<void>;

  /**
   * script to set values in pkg
   * @example set('scripts.test`, 'echo "test"')
   * */
  set(value: string): void;
  exec(value: string): void;
  uninstall(packages: string[]): Promise<void>;
  init(packages: string): void;
}
