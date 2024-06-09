import type {
  CLI,
  DependencyInstallation,
  PackageManagerInterface,
} from '../../../type/interfaces/package-manager.interface.js';
import { PackageManagerAbstract } from './package-manager.abstract.js';

export class YarnManager
  extends PackageManagerAbstract
  implements PackageManagerInterface
{
  readonly cli: CLI = {
    install: 'yarn add',
    set: `npm pkg set`,
    exec: `yarn`,
    uninstall: `yarn remove`,
    init: `yarn create`,
  };

  readonly dependencyInstallation: DependencyInstallation = {
    dependency: '--save',
    devDependency: '--dev',
  };
}
