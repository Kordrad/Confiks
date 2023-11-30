import { fileSystem } from '../../../services/node/file-system.service.js';
import { huskyService } from '../../../services/packages/husky/husky.service.js';
import { DependencyTypeEnum } from '../../../type/enums/dependency-type.enum.js';
import { stringify } from '../../../utils/json.utils.js';
import { packageIsInstalled } from '../../../utils/package-json.utils.js';
import { BasePackage } from '../base.package.js';
import { husky } from '../husky/husky.package.js';

/**
 * @see https://www.npmjs.com/package/lint-staged
 * */
class LintStagedPackage extends BasePackage {
  readonly title = '🚫💩 lint-staged';
  readonly package = 'lint-staged';
  readonly dependencyType = DependencyTypeEnum.devDependency;
  readonly description =
    "Run linters against staged git files and don't let 💩 slip into your code base!";

  configure(): void {
    if (packageIsInstalled(husky.package)) {
      huskyService.addHook('pre-commit', 'npx lint-staged');
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

export const lintStaged = new LintStagedPackage();
