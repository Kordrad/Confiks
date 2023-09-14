import { huskyService } from '../../services/husky.service.js';
import { fileSystem } from '../../services/node/file-system.service.js';
import { DependencyTypeEnum } from '../../type/enums/dependency-type.enum.js';
import { packageIsInstalled } from '../../utils/package-json.utils.js';
import { BasePackage } from '../base.package.js';
import { husky } from '../husky/husky.package.js';
import { prettier } from '../prettier/prettier.package.js';

/**
 * @see https://www.npmjs.com/package/lint-staged
 * */
class LintStagedPackage extends BasePackage {
  readonly name = '🚫💩 lint-staged';
  readonly package = 'lint-staged';
  readonly dependencyType = DependencyTypeEnum.devDependency;

  prepare(): void {
    if (packageIsInstalled(husky.package)) {
      huskyService.addHook('pre-commit', 'npx lint-staged');
    }

    const lintStagedRules = [
      ...this.#addRule('eslint', `"*.{js,ts}": ["eslint --quiet --fix"]`),
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
