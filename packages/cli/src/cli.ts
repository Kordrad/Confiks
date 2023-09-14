#!/usr/bin/env node

import { finalize } from 'rxjs';

import { PACKAGES_MAP } from './packages/packages.const.js';
import { packagesInstall$, questions, questions$ } from './questions.js';
import { InitializerService } from './services/inicjalizator.service.js';
import { PackagesEnumKeys } from './type/enums/packages.enum.js';
import { QuestionsNames } from './type/enums/question-names.enum.js';
import { BasePackageInterface } from './type/interfaces/base-package.interface.js';

const initializer = new InitializerService();

packagesInstall$
  .pipe(
    finalize(() => {
      initializer.configureProject();
    })
  )
  .subscribe(({ name, answer }) => {
    if (name === QuestionsNames.install) {
      initializer.addPackages(answer);

      const extensions: BasePackageInterface[] = [];
      for (const packageName of answer) {
        const packageInstance = PACKAGES_MAP.get(packageName);
        if (packageInstance.extensions?.length) {
          extensions.push(...packageInstance.extensions);
        }
      }

      if (extensions.length > 0) {
        questions$.next(
          questions[QuestionsNames.install_extensions](extensions)
        );
        return;
      }
    }

    if (name === QuestionsNames.install_extensions) {
      initializer.addPackages(answer satisfies PackagesEnumKeys[]);
    }

    questions$.complete();
  });
