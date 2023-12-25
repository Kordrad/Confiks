import { DependencyTypeEnum } from '../../../../type/enums/dependency-type.enum.js';
import { BasePackage } from '../../base.package.js';

export class EslintPluginSimpleImportSortPackage extends BasePackage {
  readonly title = 'eslint-plugin-simple-import-sort ↕️';
  readonly package = 'eslint-plugin-simple-import-sort';
  readonly version = '10';
  readonly dependencyType = DependencyTypeEnum.devDependency;
  readonly description = 'Easy autofixable import sorting.';
}
