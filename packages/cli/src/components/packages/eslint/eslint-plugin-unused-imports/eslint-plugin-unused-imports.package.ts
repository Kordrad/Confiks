import type { DependencyType } from '../../../../type/types/dependency-type.type.js';
import { BasePackage } from '../../base.package.js';

export class EslintPluginUnusedImportsPackage extends BasePackage {
  readonly title = 'eslint-plugin-unused-imports 🚮';
  readonly package = 'eslint-plugin-unused-imports';
  readonly version = '4';
  readonly dependencyType: DependencyType = 'devDependency';
  readonly description = 'Find and remove unused es6 module imports.';
}
