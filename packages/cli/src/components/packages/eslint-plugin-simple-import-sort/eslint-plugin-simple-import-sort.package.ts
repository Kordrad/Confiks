import type { DependencyType } from '../../../type/types/dependency-type.type.js';
import { CommonPackageAbstract } from '../../abstract/common-package.abstract.js';

export class EslintPluginSimpleImportSortPackage extends CommonPackageAbstract {
  readonly title = 'eslint-plugin-simple-import-sort ↕️';
  readonly package = 'eslint-plugin-simple-import-sort';
  readonly version = '12';
  readonly dependencyType: DependencyType = 'devDependency';
  readonly description = 'Easy autofixable import sorting.';
}
