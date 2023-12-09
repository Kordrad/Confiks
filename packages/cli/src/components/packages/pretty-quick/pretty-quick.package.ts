import { huskyService } from '../../../services/packages/husky/husky.service.js';
import { DependencyTypeEnum } from '../../../type/enums/dependency-type.enum.js';
import { packageIsInstalled } from '../../../utils/package-json.utils.js';
import { BasePackage } from '../base.package.js';
import { HuskyPackage } from '../husky/husky.package.js';

/**
 * @see https://github.com/azz/pretty-quick
 * */
export class PrettyQuickPackage extends BasePackage {
  readonly dependencyType = DependencyTypeEnum.devDependency;
  readonly title = 'pretty-quick';
  readonly package = 'pretty-quick';
  readonly description = 'Runs Prettier on your changed files.';

  configure(): void {
    if (!packageIsInstalled(new HuskyPackage().package)) {
      return;
    }
    huskyService.addHook('pre-commit', 'npx pretty-quick --staged');
  }
}
