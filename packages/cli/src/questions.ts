import inquirer from 'inquirer';
import { Subject } from 'rxjs';

import { commitLint } from './packages/commit-lint/commit-lint.package.js';
import { husky } from './packages/husky/husky.package.js';
import { lintStaged } from './packages/lint-staged/lint-staged.package.js';
import { prettier } from './packages/prettier/prettier.package.js';
import { prettyQuick } from './packages/pretty-quick/pretty-quick.package.js';
import { QuestionsNames } from './type/enums/question-names.enum.js';
import { BasePackageInterface } from './type/interfaces/base-package.interface.js';

export const questions$ = new Subject();
export const questions = {
  [QuestionsNames.install]: {
    type: 'checkbox',
    message: 'Pick packages to install',
    name: QuestionsNames.install,
    choices: [husky, prettier, commitLint, prettyQuick, lintStaged],
  },
  [QuestionsNames.install_extensions]: (choices: BasePackageInterface[]) => ({
    type: 'checkbox',
    message: 'Pick extensions to install',
    name: QuestionsNames.install_extensions,
    choices,
  }),
};

export const packagesInstall$ = inquirer.prompt(questions$).ui.process;

questions$.next(questions[QuestionsNames.install]);
