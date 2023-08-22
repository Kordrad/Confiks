import { BASE, HAS_EXTENSIONS, PACKAGES } from './constants';
import { PackagesEnum } from './enums';
import { AnswersPackagesInterface } from './interfaces';
import { packageIsInstalled } from './utils';

async function loadMyModule() {
  const { default: inquirer } = await import('inquirer');
  const NAME = 'packages';
  inquirer
    .prompt([
      {
        type: 'checkbox',
        message: 'Packages to install',
        name: NAME,
        choices: BASE,
      },
      ...HAS_EXTENSIONS.map((package_, id) => ({
        type: 'checkbox',
        message: `install external dependencies for ${package_.name}? (enter to skip)`,
        name: `${NAME}${id}`,
        choices: package_.extensions,
        when: (answers: AnswersPackagesInterface) => {
          return (
            answers[NAME].includes(package_.value) ||
            packageIsInstalled(package_.package)
          );
        },
      })),
    ])
    .then((answers: AnswersPackagesInterface) => {
      let packagesToInstall: PackagesEnum[] = [];
      for (const key of Object.keys(answers)) {
        if (key.includes(NAME)) {
          packagesToInstall = [...packagesToInstall, ...answers[key]];
        }
      }

      const preparedPackages = packagesToInstall.map(value =>
        PACKAGES.get?.(value)
      );

      for (const package_ of preparedPackages) {
        package_?.install();
      }

      for (const package_ of preparedPackages) {
        package_?.afterInstall?.();
      }
    });
}

// eslint-disable-next-line unicorn/prefer-top-level-await
loadMyModule().then();
