import { NpmService } from '../../../services/npm/npm.service.js';
import { DependencyTypeEnum } from '../../../type/enums/dependency-type.enum.js';
import { BasePackage } from '../base.package.js';
import { StylelintConfigStandardScssPackage } from './stylelint-config-standard-scss/stylelint-config-standard-scss.package.js';

/**
 * A class representing the StylelintPackage.
 * @see https://stylelint.io/
 */
export class StylelintPackage extends BasePackage {
  readonly dependencyType = DependencyTypeEnum.devDependency;
  readonly description =
    'A mighty CSS linter that helps you avoid errors and enforce conventions.';
  readonly package = 'stylelint';
  readonly title = 'Stylelint';
  readonly extensions = [new StylelintConfigStandardScssPackage()];

  configure(): void {
    new NpmService().init(this.package);
  }
}

export const styleLint = new StylelintPackage();
