import type { DependencyType } from '../../../type/types/dependency-type.type.js';
import { CommonPackageAbstract } from '../../abstract/common-package.abstract.js';

export class ConfigConventionalPackage extends CommonPackageAbstract {
  readonly title = 'config-conventional';
  readonly package = '@commitlint/config-conventional';
  readonly version = '19';
  readonly dependencyType: DependencyType = 'devDependency';
  readonly description =
    'Shareable commit-lint config enforcing conventional commits.';
}
