import { fileSystem } from '../../../services/node/file-system.service.js';
import { DependencyTypeEnum } from '../../../type/enums/dependency-type.enum.js';
import { BasePackage } from '../base.package.js';
import { CONFIG, IGNORE } from './prettier.constants.js';
import { PrettierPluginOrganizeAttributesPackage } from './prettier-plugin-organize-attributes/prettier-plugin-organize-attributes.package.js';

/**
 * @see https://www.npmjs.com/package/prettier
 * */
export class PrettierPackage extends BasePackage {
  readonly title = 'Prettier 🖌️';
  readonly dependencyType = DependencyTypeEnum.devDependency;
  readonly package = 'prettier';
  readonly description = 'An opinionated code formatter.';
  readonly extensions = [new PrettierPluginOrganizeAttributesPackage()];

  configure(): void {
    fileSystem.writeFile('.prettierrc', CONFIG());
    fileSystem.writeFile('.prettierignore', IGNORE);
  }
}
