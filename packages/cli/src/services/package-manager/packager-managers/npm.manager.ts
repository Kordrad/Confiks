import type {
  CLI,
  DependencyInstallation,
  PackageManagerInterface,
} from '../../../type/interfaces/package-manager.interface.js';
import { PackageManagerAbstract } from './package-manager.abstract.js';

export class NpmManager
  extends PackageManagerAbstract
  implements PackageManagerInterface
{
  readonly cli: CLI = {
    install: 'npm i',
    set: `npm pkg set`,
    exec: `npx`,
    uninstall: `npm uninstall`,
    init: `npm init`,
  };

  readonly dependencyInstallation: DependencyInstallation = {
    dependency: '--save-prod',
    devDependency: '--save-dev',
  };
}
