import { huskyService } from '../../../services/packages/husky/husky.service.js';
import type { DependencyType } from '../../../type/types/dependency-type.type.js';
import { BasePackage } from '../base.package.js';

/**
 * @see https://typicode.github.io/husky/
 * */
export class HuskyPackage extends BasePackage {
  readonly title = 'Husky 🐶';
  readonly package = 'husky';
  readonly version = '8';
  readonly dependencyType: DependencyType = 'devDependency';
  readonly description = 'Husky improves your commits and more woof!';

  configure(): void {
    huskyService.prepare();
  }
}
