import { huskyService } from '../../services/husky.service';
import { DependencyTypeEnum, PackagesEnumKeys } from '../../type/enums';
import { packageIsInstalled } from '../../utils';
import { BasePackage } from '../base.package';
import { husky } from '../husky/husky.package';

/**
 * @see https://github.com/azz/pretty-quick
 * */
class PrettyQuickPackage extends BasePackage {
  readonly dependencyType: DependencyTypeEnum =
    DependencyTypeEnum.devDependency;
  readonly name: string = 'pretty-quick';
  readonly package: PackagesEnumKeys = 'pretty-quick';

  prepare(): void {
    if (!packageIsInstalled(husky.package)) {
      return;
    }
    huskyService.addHook('pre-commit', 'npx pretty-quick --staged');
  }
}

export const prettyQuick = new PrettyQuickPackage();
