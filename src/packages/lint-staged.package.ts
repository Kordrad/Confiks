import { huskyService } from '../services/husky.service';
import { fileSystem } from '../services/node';
import { DependencyTypeEnum, PackagesEnumKeys } from '../type/enums';
import { packageIsInstalled } from '../utils';
import { BasePackage } from './base.package';
import { husky } from './husky.package';
import { prettier } from './prettier.package';

class LintStagedPackage extends BasePackage {
  readonly name: string = '🚫💩 lint-staged';
  readonly package: PackagesEnumKeys = 'lint-staged';
  readonly dependencyType: DependencyTypeEnum =
    DependencyTypeEnum.devDependency;

  prepare(): void {
    if (packageIsInstalled(husky.package)) {
      huskyService.addHook('pre-commit', 'npx lint-staged');
    }

    const lintStagedRules = [
      ...this.addRule('eslint', `"*.{js,ts}": ["eslint --quiet --fix"]`),
      ...this.addRule(
        prettier.package,
        `"*.{json,js,ts,html}": ["prettier --write --ignore-unknown"]`
      ),
    ].join(',\n  ');
    fileSystem.writeFile('.lintstagedrc', `{\n  ${lintStagedRules}\n}`);
  }

  private addRule(packageName: string, line: string): string[] {
    return packageIsInstalled(packageName) ? [line] : [];
  }
}

export const lintStaged = new LintStagedPackage();
