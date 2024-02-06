import type { DependencyType } from '../../../../type/types/dependency-type.type.js';
import { BasePackage } from '../../base.package.js';

export class EslintPluginUnicornPackage extends BasePackage {
  readonly title = 'eslint-plugin-unicorn 🦄';
  readonly package = 'eslint-plugin-unicorn';
  readonly version = '51';
  readonly dependencyType: DependencyType = 'devDependency';
  readonly description = 'More than 100 powerful ESLint rules';
}
