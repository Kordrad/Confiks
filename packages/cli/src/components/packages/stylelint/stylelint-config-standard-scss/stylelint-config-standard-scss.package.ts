import { StylelintService } from '../../../../services/stylelint/stylelint.service.js';
import { DependencyTypeEnum } from '../../../../type/enums/dependency-type.enum.js';
import { BasePackage } from '../../base.package.js';

/**
 * A class representing the StylelintConfigStandardScssPackage.
 * @see https://www.npmjs.com/package/stylelint-config-standard-scss
 */
export class StylelintConfigStandardScssPackage extends BasePackage {
  readonly dependencyType = DependencyTypeEnum.devDependency;
  readonly description = 'The standard shareable SCSS config for Stylelint.';
  readonly package = 'stylelint-config-standard-scss';
  readonly title = 'stylelint-config-standard-scss';

  configure(): void {
    new StylelintService().addExtension([this.package]);
  }
}
