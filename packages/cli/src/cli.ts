#!/usr/bin/env node

import { finalize, tap } from 'rxjs';

import { PACKAGES_MAP } from './packages/packages.const.js';
import { packagesInstall$, questions, questions$ } from './questions.js';
import { InitializerService } from './services/inicjalizator.service.js';
import { PackagesEnumKeys } from './type/enums/packages.enum.js';
import { QuestionsNames } from './type/enums/question-names.enum.js';
import { BasePackageInterface } from './type/interfaces/base-package.interface.js';
import { getQestion } from './utils/rxjs.utils.js';

const initializer = new InitializerService();

packagesInstall$
  .pipe(
    getQestion(QuestionsNames.install, ({ answer }) => {
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
      }
    }),
    getQestion(QuestionsNames.install_extensions, ({ answer }) => {
      initializer.addPackages(answer satisfies PackagesEnumKeys[]);
    }),
    tap(() => {
      const toPrepare = initializer.packages.filter(
        ({ prepare }) => typeof prepare === 'function'
      );
      if (toPrepare.length > 0) {
        for (const package_ of toPrepare) {
          package_.prepare();
        }
      }
    }),
    finalize(() => {
      initializer.configureProject();
    })
  )
  .subscribe(() => {
    questions$.complete();
  });
