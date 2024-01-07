import { fileSystem } from '../../../services/node/file-system.service.js';
import { huskyService } from '../../../services/packages/husky/husky.service.js';
import { DependencyTypeEnum } from '../../../type/enums/dependency-type.enum.js';
import { packageIsInstalled } from '../../../utils/package-json.utils.js';
import { BasePackage } from '../base.package.js';
import { HuskyPackage } from '../husky/husky.package.js';
import { CONFIG, CONFIG_NAME } from './commit-lint.constants.js';
import { ConfigConventionalPackage } from './config-conventional/config-conventional.package.js';

/**
 * @see https://commitlint.js.org/#/
 * @see https://www.npmjs.com/package/@commitlint/cli
 * */
export class CommitLintPackage extends BasePackage {
  readonly title = 'commitLint 📔';
  readonly package = '@commitlint/cli';
  readonly version = '18';
  readonly extensions = [new ConfigConventionalPackage()];
  readonly dependencyType = DependencyTypeEnum.devDependency;
  readonly description = 'Helps your team adhere to a commit convention.';

  configure(): void {
    this.#createConfig();
    this.#prepareHusky();
  }

  #createConfig(): void {
    fileSystem.writeFile(CONFIG_NAME, CONFIG());
  }

  #prepareHusky(): void {
    if (!packageIsInstalled(new HuskyPackage().package)) {
      return;
    }
    huskyService.addHook('commit-msg', 'npx --no -- commitlint --edit ${1}');
  }
}
