import { DependencyTypeEnum } from '../../../../type/enums/dependency-type.enum.js';
import { BasePackage } from '../../base.package.js';

export class EslintPluginUnicornPackage extends BasePackage {
  readonly title = 'eslint-plugin-unicorn 🦄';
  readonly package = 'eslint-plugin-unicorn';
  readonly dependencyType = DependencyTypeEnum.devDependency;
  readonly description = 'More than 100 powerful ESLint rules';
}
