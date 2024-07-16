import { fileSystem } from '../../../services/node/file-system.service.js';
import { PackageManagerService } from '../../../services/package-manager/package-manager.service.js';
import type { DependencyType } from '../../../type/types/dependency-type.type.js';
import type { Package } from '../../../type/types/packages.type.js';
import { CommonPackageAbstract } from '../../abstract/common-package.abstract.js';
import {
  CONFIG_NAME,
  CONFIG_STANDARD_PACKAGE,
} from '../stylelint/stylelint.constants.js';

export class StylelintConfigStandardScssPackage extends CommonPackageAbstract {
  readonly title = 'stylelint-config-standard-scss';
  readonly package: Package = 'stylelint-config-standard-scss';
  readonly version = '13';
  readonly dependencyType: DependencyType = 'devDependency';
  readonly description = 'The standard shareable SCSS config for Stylelint.';

  configure() {
    this.#replaceConfigForStylelint();
    this.#removeOldConfigPackage().then();
  }

  #replaceConfigForStylelint(): void {
    const PATH_CONFIG = `./${CONFIG_NAME}`;
    const stylelintConfig = fileSystem.readFileSync(PATH_CONFIG);
    const newConfig = stylelintConfig.replace(
      new RegExp(CONFIG_STANDARD_PACKAGE, 'gi'),
      this.package
    );
    fileSystem.writeFile(PATH_CONFIG, newConfig);
  }

  async #removeOldConfigPackage(): Promise<void> {
    await new PackageManagerService().uninstall([CONFIG_STANDARD_PACKAGE]);
  }
}
