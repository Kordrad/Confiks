import { fileSystem } from '../../../services/node/file-system.service.js';
import { huskyService } from '../../../services/packages/husky/husky.service.js';
import { DependencyTypeEnum } from '../../../type/enums/dependency-type.enum.js';
import { packageIsInstalled } from '../../../utils/package-json.utils.js';
import { BasePackage } from '../base.package.js';
import { eslint } from '../eslint/eslint.package.js';
import { husky } from '../husky/husky.package.js';
import { prettier } from '../prettier/prettier.package.js';

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

    const lintStagedRules = [
      ...this.#addRule(
        eslint.package,
        `"*.{js,ts,jsx}": ["eslint --quiet --fix"]`
      ),
      ...this.#addRule(
        prettier.package,
        `"*.{json,js,ts,html}": ["prettier --write --ignore-unknown"]`
      ),
    ].join(',\n  ');
    fileSystem.writeFile('.lintstagedrc', `{\n  ${lintStagedRules}\n}`);
  }

  #addRule(packageName: string, line: string): string[] {
    return packageIsInstalled(packageName) ? [line] : [];
  }
}

export const lintStaged = new LintStagedPackage();
