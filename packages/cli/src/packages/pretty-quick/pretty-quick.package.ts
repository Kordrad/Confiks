import { huskyService } from '../../services/husky.service.js';
import { DependencyTypeEnum } from '../../type/enums/dependency-type.enum.js';
import { packageIsInstalled } from '../../utils/package-json.utils.js';
import { BasePackage } from '../base.package.js';
import { husky } from '../husky/husky.package.js';

/**
 * @see https://github.com/azz/pretty-quick
 * */
class PrettyQuickPackage extends BasePackage {
  readonly dependencyType = DependencyTypeEnum.devDependency;
  readonly name = 'pretty-quick';
  readonly package = 'pretty-quick';

  configure(): void {
    if (!packageIsInstalled(husky.package)) {
      return;
    }
    huskyService.addHook('pre-commit', 'npx pretty-quick --staged');
  }
}

export const prettyQuick = new PrettyQuickPackage();
