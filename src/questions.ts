import { from } from 'rxjs';

import { BASE, HAS_EXTENSIONS, HAS_PREPARATION } from './constants';
import { packageIsInstalled } from './utils';

export const NAMES = {
  install: 'install',
  prepare: 'prepare',
};

export const questions$ = from([
  {
    type: 'checkbox',
    message: 'Packages to install',
    name: NAMES.install,
    choices: BASE,
  },
  ...HAS_EXTENSIONS.map((package_, id) => ({
    type: 'checkbox',
    message: `Install external dependencies for ${package_.name}? (enter to skip)`,
    name: `${NAMES.install}_${id}`,
    choices: package_.extensions,
    when: (answers: any) => {
      return (
        answers['install'].includes(package_.value) ||
        packageIsInstalled(package_.package)
      );
    },
  })),
  ...HAS_PREPARATION.map(package_ => ({
    type: 'confirm',
    message: `Automatically prepare ${package_.name}?`,
    name: `prepare_${package_.value}`,
    when: (answers: any) => {
      return (
        answers['install'].includes(package_.value) ||
        packageIsInstalled(package_.package)
      );
    },
  })),
]);
