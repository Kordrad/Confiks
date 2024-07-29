import type { DependencyType } from '../../../type/types/dependency-type.type.js';
import { CommonPackageAbstract } from '../../abstract/common-package.abstract.js';

export class EslintPluginUnicornPackage extends CommonPackageAbstract {
  readonly title = 'eslint-plugin-unicorn 🦄';
  readonly package = 'eslint-plugin-unicorn';
  readonly version = '53';
  readonly dependencyType: DependencyType = 'devDependency';
  readonly description = 'More than 100 powerful ESLint rules';
}
