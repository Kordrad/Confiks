import { STYLELINT_SCRIPTS } from '../../../constants/package-scripts-cli.constant.js';
import type { CreatorPackageInterface } from '../../../type/interfaces/package.interface.js';
import { addScripts } from '../../../utils/package-manager.utils.js';
import { StylelintConfigStandardScssPackage } from '../stylelint-config-standard-scss/stylelint-config-standard-scss.package.js';

/**
 * A class representing the StylelintPackage.
 *
 * @see https://stylelint.io/
 * @see auto init https://stylelint.io/user-guide/get-started#linting-css
 */
export class StylelintPackage implements CreatorPackageInterface {
  readonly title = 'Stylelint';
  readonly description =
    'A mighty CSS linter that helps you avoid errors and enforce conventions.';
  readonly package = 'stylelint';
  readonly extensions = [new StylelintConfigStandardScssPackage()];

  postconfigure(): void {
    addScripts(STYLELINT_SCRIPTS);
  }
}
