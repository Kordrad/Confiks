import { DependencyTypeEnum } from '../../../type/enums/dependency-type.enum.js';
import { BasePackage } from '../../base.package.js';

class EslintPluginSimpleImportSortPackage extends BasePackage {
  readonly title = 'eslint-plugin-simple-import-sort ↕️';
  readonly package = 'eslint-plugin-simple-import-sort';
  readonly dependencyType = DependencyTypeEnum.devDependency;
  readonly description = 'Easy autofixable import sorting.';
}

export const eslintPluginSimpleImportSort =
  new EslintPluginSimpleImportSortPackage();
