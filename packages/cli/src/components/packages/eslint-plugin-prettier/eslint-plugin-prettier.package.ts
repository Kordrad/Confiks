import type { DependencyType } from '../../../type/types/dependency-type.type.js';
import { CommonPackageAbstract } from '../../abstract/common-package.abstract.js';

export class EslintPluginPrettierPackage extends CommonPackageAbstract {
  readonly title = 'eslint-plugin-prettier 🖌️';
  readonly package = 'eslint-plugin-prettier';
  readonly version = '5';
  readonly dependencyType: DependencyType = 'devDependency';
  readonly description =
    'Runs Prettier as an ESLint rule and reports differences as individual ESLint issues.';
}
