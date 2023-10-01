import { take } from 'rxjs';

import { packagesInstall$, questions$ } from '../../questions.js';
import { fileSystem } from '../../services/node/file-system.service.js';
import { DependencyTypeEnum } from '../../type/enums/dependency-type.enum.js';
import { getQestion } from '../../utils/rxjs.utils.js';
import { BasePackage } from '../base.package.js';
import { CONFIG, IGNORE } from './prettier.constant.js';

/**
 * @see https://www.npmjs.com/package/prettier
 * */
class PrettierPackage extends BasePackage {
  readonly dependencyType = DependencyTypeEnum.devDependency;
  readonly name = 'prettier';
  readonly package = 'prettier';

  #config = CONFIG;
  #ignore = IGNORE;

  prepare(): void {
    questions$.next({
      type: 'confirm',
      name: 'prettier_check_config',
      message: 'Do you want to edit the file .prettierrc?',
      default: () => false,
    });
    questions$.next({
      type: 'editor',
      name: 'prettier_override_config',
      message: '.prettierrc',
      default: () => CONFIG,
      waitUserInput: true,
      when: answers => answers.prettier_check_config,
    });

    questions$.next({
      type: 'confirm',
      name: 'prettier_check_ignore',
      message: 'Do you want to edit the file .prettierignore?',
      default: () => false,
    });
    questions$.next({
      type: 'editor',
      name: 'prettier_override_ignore',
      message: '.prettierignore',
      default: () => IGNORE,
      waitUserInput: true,
      when: answers => answers.prettier_check_ignore,
    });

    packagesInstall$
      .pipe(
        take(1),
        getQestion(
          'prettier_override_config',
          ({ answer }) => (this.#config = answer)
        ),
        getQestion(
          'prettier_override_ignore',
          ({ answer }) => (this.#ignore = answer)
        )
      )
      .subscribe();
  }

  configure(): void {
    fileSystem.writeFile('.prettierrc', this.#config);
    fileSystem.writeFile('.prettierignore', this.#ignore);
  }
}

export const prettier = new PrettierPackage();
