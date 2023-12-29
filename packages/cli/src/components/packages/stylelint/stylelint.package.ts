import { DependencyTypeEnum } from '../../../type/enums/dependency-type.enum.js';
import { BasePackage } from '../base.package.js';

/**
 * A class representing the StylelintPackage.
 *
 * @see https://stylelint.io/
 * @see auto init https://stylelint.io/user-guide/get-started#linting-css
 */
export class StylelintPackage extends BasePackage {
  readonly dependencyType = DependencyTypeEnum.none;
  readonly description =
    'A mighty CSS linter that helps you avoid errors and enforce conventions.';
  readonly package = 'stylelint';
  readonly title = 'Stylelint';
  readonly version = 'latest';
}
