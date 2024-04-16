import { PRETTIER_SCRIPTS } from '../../../constants/package-scripts-cli.constant.js';
import { fileSystem } from '../../../services/node/file-system.service.js';
import type { DependencyType } from '../../../type/types/dependency-type.type.js';
import { BasePackage } from '../base.package.js';
import { CONFIG, IGNORE } from './prettier.constants.js';
import { PrettierPluginOrganizeAttributesPackage } from './prettier-plugin-organize-attributes/prettier-plugin-organize-attributes.package.js';

/**
 * @see https://www.npmjs.com/package/prettier
 * */
export class PrettierPackage extends BasePackage {
  readonly title = 'Prettier 🖌️';
  readonly package = 'prettier';
  readonly version = '3';
  readonly dependencyType: DependencyType = 'devDependency';
  readonly description = 'An opinionated code formatter.';
  readonly extensions = [new PrettierPluginOrganizeAttributesPackage()];

  configure(): void {
    fileSystem.writeFile('.prettierrc', CONFIG());
    fileSystem.writeFile('.prettierignore', IGNORE);
    this.addScripts(PRETTIER_SCRIPTS);
  }
}
