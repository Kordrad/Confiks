import type { DependencyType } from '../../../../type/types/dependency-type.type.js';
import { BasePackage } from '../../base.package.js';

export class EslintPluginSimpleImportSortPackage extends BasePackage {
  readonly title = 'eslint-plugin-simple-import-sort ↕️';
  readonly package = 'eslint-plugin-simple-import-sort';
  readonly version = '12';
  readonly dependencyType: DependencyType = 'devDependency';
  readonly description = 'Easy autofixable import sorting.';
}
