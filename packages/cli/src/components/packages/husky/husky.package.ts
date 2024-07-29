import { huskyService } from '../../../services/packages/husky/husky.service.js';
import type { DependencyType } from '../../../type/types/dependency-type.type.js';
import { CommonPackageAbstract } from '../../abstract/common-package.abstract.js';

/**
 * @see https://typicode.github.io/husky/
 * */
export class HuskyPackage extends CommonPackageAbstract {
  readonly title = 'Husky 🐶';
  readonly package = 'husky';
  readonly version = '9';
  readonly dependencyType: DependencyType = 'devDependency';
  readonly description = 'Husky enhances your commits and more 🐶 woof!';

  preconfigure(): void {
    huskyService.init();
  }
}
