import type { DependencyType } from '../../../type/types/dependency-type.type.js';
import type { Package } from '../../../type/types/packages.type.js';
import { CommonPackageAbstract } from '../../abstract/common-package.abstract.js';

export class PrettierPluginOrganizeAttributesPackage extends CommonPackageAbstract {
  readonly title = 'prettier-plugin-organize-attributes 🧼';
  readonly package: Package = 'prettier-plugin-organize-attributes';
  readonly version = '1';
  readonly dependencyType: DependencyType = 'devDependency';
  readonly description =
    'Organize your HTML attributes automatically with Prettier.';
  readonly pluginName = this.package;
}
