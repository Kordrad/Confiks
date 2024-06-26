import { STYLELINT_SCRIPTS } from '../../../constants/package-scripts-cli.constant.js';
import type { DependencyType } from '../../../type/types/dependency-type.type.js';
import { BasePackage } from '../base.package.js';
import { StylelintConfigStandardScssPackage } from './stylelint-config-standard-scss/stylelint-config-standard-scss.package.js';

/**
 * A class representing the StylelintPackage.
 *
 * @see https://stylelint.io/
 * @see auto init https://stylelint.io/user-guide/get-started#linting-css
 */
export class StylelintPackage extends BasePackage {
  readonly dependencyType: DependencyType = 'none';
  readonly description =
    'A mighty CSS linter that helps you avoid errors and enforce conventions.';
  readonly package = 'stylelint';
  readonly title = 'Stylelint';
  readonly version = 'latest';
  readonly extensions = [new StylelintConfigStandardScssPackage()];

  postconfigure(): void {
    this.addScripts(STYLELINT_SCRIPTS);
  }
}
