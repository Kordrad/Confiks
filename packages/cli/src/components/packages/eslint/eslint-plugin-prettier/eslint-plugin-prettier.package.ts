import type { DependencyType } from '../../../../type/types/dependency-type.type.js';
import { BasePackage } from '../../base.package.js';

export class EslintPluginPrettierPackage extends BasePackage {
  readonly title = 'eslint-plugin-prettier 🖌️';
  readonly package = 'eslint-plugin-prettier';
  readonly version = '5';
  readonly dependencyType: DependencyType = 'devDependency';
  readonly description =
    'Runs Prettier as an ESLint rule and reports differences as individual ESLint issues.';
}
