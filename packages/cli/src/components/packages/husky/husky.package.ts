import { huskyService } from '../../../services/packages/husky/husky.service.js';
import { DependencyTypeEnum } from '../../../type/enums/dependency-type.enum.js';
import { BasePackage } from '../base.package.js';

/**
 * @see https://typicode.github.io/husky/
 * */
export class HuskyPackage extends BasePackage {
  readonly title = 'Husky 🐶';
  readonly package = 'husky';
  readonly version = '8';
  readonly dependencyType = DependencyTypeEnum.devDependency;
  readonly description = 'Husky improves your commits and more woof!';

  configure(): void {
    huskyService.prepare();
  }
}
