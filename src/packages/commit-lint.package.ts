import { PackagesEnumKeys } from '../enums';
import { childProcess } from '../services/node';
import { BasePackage } from './base.package';
import { configConventional } from './extensions';

class CommitLintPackage extends BasePackage {
  readonly name: string = 'commitLint 📔';
  readonly package: PackagesEnumKeys = '@commitlint/cli';
  readonly extensions = [configConventional];

  install() {
    this.installation('-D');
  }

  afterInstall() {
    this.askToAddToHook().then();
  }

  private async askToAddToHook(): Promise<void> {
    const { default: inquirer } = await import('inquirer');
    inquirer
      .prompt({
        type: 'confirm',
        message: `Add ${this.name} to husky?`,
        name: 'addToHusky',
      })
      .then(answers => {
        if (answers.addToHusky) {
          childProcess.execSync(
            'npx husky add .husky/pre-commit "npx --no -- commitlint --edit ${1}"'
          );
        }
      });
  }
}

export const commitLint = new CommitLintPackage();
