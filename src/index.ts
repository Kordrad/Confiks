import { catchError, finalize, throwError } from 'rxjs';

import { NAMES, questions$ } from './questions';
import { packageManagerService } from './services/package-menager.service';
import { PackagesEnum } from './type/enums';
import { BasePackageInterface } from './type/interfaces';
import { getPackageByKey } from './utils';

async function loadMyModule() {
  const { default: inquirer } = await import('inquirer');

  const answers = {
    install: [] as BasePackageInterface[],
    prepare: [] as BasePackageInterface[],
  };

  inquirer
    // @ts-ignore
    .prompt(questions$)
    .ui.process.pipe(
      finalize(() => {
        const { install, prepare } = answers;
        for (const package_ of install) {
          packageManagerService.addPackage(
            package_.package,
            package_.dependencyType
          );
        }

        packageManagerService.install();

        for (const package_ of prepare) package_.prepare?.();
      }),
      catchError(error => throwError(() => error))
    )
    .subscribe(({ name, answer }: { name: string; answer: unknown[] }) => {
      if (name.includes(NAMES.install)) {
        for (const key of answer) {
          const package_ = getPackageByKey(key as PackagesEnum);
          if (package_) answers.install.push(package_);
        }
      }
      if (name.includes(NAMES.prepare) && answer) {
        const packageValue = name.replace(`${NAMES.prepare}_`, '');
        const package_ = getPackageByKey(Number(packageValue));

        if (package_) answers.prepare.push(package_);
      }
    });
}

// eslint-disable-next-line unicorn/prefer-top-level-await
loadMyModule().then();
