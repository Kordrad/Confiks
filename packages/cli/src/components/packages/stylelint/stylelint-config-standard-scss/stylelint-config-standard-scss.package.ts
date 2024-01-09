import { fileSystem } from '../../../../services/node/file-system.service.js';
import { PackageManagerService } from '../../../../services/package-manager/package-manager.service.js';
import { DependencyTypeEnum } from '../../../../type/enums/dependency-type.enum.js';
import type { PackagesEnumKeys } from '../../../../type/enums/packages.enum.js';
import { BasePackage } from '../../base.package.js';
import {
  CONFIG_NAME,
  CONFIG_STANDARD_PACKAGE,
} from '../stylelint.constants.js';

export class StylelintConfigStandardScssPackage extends BasePackage {
  readonly title = 'stylelint-config-standard-scss';
  readonly package: PackagesEnumKeys = 'stylelint-config-standard-scss';
  readonly version = '13';
  readonly dependencyType = DependencyTypeEnum.devDependency;
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
