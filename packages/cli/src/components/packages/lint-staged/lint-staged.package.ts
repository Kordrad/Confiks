import HUSKY_CLI from '../../../constants/husky-cli.constant.js';
import { fileSystem } from '../../../services/node/file-system.service.js';
import { huskyService } from '../../../services/packages/husky/husky.service.js';
import type { DependencyType } from '../../../type/types/dependency-type.type.js';
import { stringify } from '../../../utils/json.utils.js';
import { packageIsInstalled } from '../../../utils/package-json.utils.js';
import { CommonPackageAbstract } from '../../abstract/common-package.abstract.js';
import { HuskyPackage } from '../husky/index.js';

/**
 * @see https://www.npmjs.com/package/lint-staged
 * */
export class LintStagedPackage extends CommonPackageAbstract {
  readonly title = '🚫💩 lint-staged';
  readonly package = 'lint-staged';
  readonly version = '15';
  readonly dependencyType: DependencyType = 'devDependency';
  readonly description =
    "Run linters against staged git files and don't let 💩 slip into your code base!";
  configure(): void {
    if (packageIsInstalled(new HuskyPackage().package)) {
      huskyService.addHook('pre-commit', HUSKY_CLI.lint_staged);
    }

    this.#createConfig().then();
  }

  async #createConfig(): Promise<void> {
    const { CONFIG, CONFIG_NAME } = await import(
      './lint-staged-config.constant.js'
    );

    fileSystem.writeFile(CONFIG_NAME, stringify(CONFIG()));
  }
}
