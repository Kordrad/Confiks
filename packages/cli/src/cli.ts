#!/usr/bin/env node

//    ____             __ _ _
//   / ___|___  _ __  / _(_) | _____
//  | |   / _ \| '_ \| |_| | |/ / __|
//  | |__| (_) | | | |  _| |   <\__ \
//   \____\___/|_| |_|_| |_|_|\_\___/
//

import chalk from 'chalk';
import enquirer from 'enquirer';
import gradient from 'gradient-string';
import ora from 'ora';

import { PackageChoice } from './components/package-choice.component.js';
import { commitLint } from './packages/commit-lint/commit-lint.package.js';
import { husky } from './packages/husky/husky.package.js';
import { lintStaged } from './packages/lint-staged/lint-staged.package.js';
import { prettier } from './packages/prettier/prettier.package.js';
import { prettyQuick } from './packages/pretty-quick/pretty-quick.package.js';
import { InitializerService } from './services/initializer.service.js';
import { type Choice } from './type/interfaces/choice.interface.js';
import { type PackageInterface } from './type/interfaces/package.interface.js';
import { getModifiedFiles, getUntrackedFiles } from './utils/git.utils.js';
import { pathsLog, welcomeLog } from './utils/logs.utils.js';

async function selectPackages(): Promise<PackageInterface[]> {
  const { packages } = await enquirer.prompt<{
    packages: PackageInterface[];
  }>({
    type: 'multiselect',
    name: 'packages',
    message: 'Pick packages to install',
    choices: [
      new PackageChoice(commitLint),
      new PackageChoice(husky),
      new PackageChoice(lintStaged),
      new PackageChoice(prettier),
      new PackageChoice(prettyQuick),
    ] satisfies Choice[],
    prefix: '📦',
    result() {
      return this.selected.map(({ value }) => value);
    },
  });
  return packages;
}

async function selectExtensions(
  choices: PackageInterface[]
): Promise<PackageInterface[]> {
  if (choices.length === 0) {
    return [];
  }
  const { extensions } = await enquirer.prompt<{
    extensions: PackageInterface[];
  }>({
    type: 'multiselect',
    name: 'extensions',
    message: 'Pick extensions to install',
    choices: choices.map(choice => new PackageChoice(choice)),
    prefix: '🧰',
    result() {
      return this.selected.map(({ value }) => value);
    },
  });
  return extensions;
}

function configureProject(packages: PackageInterface[]): Promise<void> {
  return new Promise(resolve =>
    welcomeLog(() => {
      const spinners = {
        install: ora(`📦 ${chalk.yellow('Packages')} installation`),
        configure: ora(`⚙️ ${chalk.yellow('Packages')} configuration`),
      };

      console.log(chalk.bold(gradient.vice('Configuration project')));
      const initializerService = new InitializerService();
      spinners.install.start();
      initializerService.addPackages(packages);
      initializerService
        .install()
        .then(() => {
          spinners.install.succeed();
          spinners.configure.start();
          return initializerService.configure();
        })
        .then(() => {
          spinners.configure.succeed();
          resolve();
        });
    })
  );
}

function endScreen(): void {
  // Colors
  const { dim, red } = chalk;
  const orange = chalk.hex('FF8C00');

  // Files
  const modifiedFiles = orange(getModifiedFiles());
  const untrackedFiles = red(getUntrackedFiles());

  const SUGGESTIONS_URL = `${dim(
    'Any suggestions? Give me feedback:'
  )} https://github.com/Kordrad/Confiks/issues`;
  const PATHS =
    modifiedFiles.length > 0 || untrackedFiles.length > 0
      ? `
Check the following files to make sure they are configured correctly:
${pathsLog(modifiedFiles, 'modified:   ')}
${pathsLog(untrackedFiles, 'untracked:  ')}
`
      : '';

  const RECOMENDATIONS = `
To make the configuration complete, we recommend that you visit the links below to make a yet unsupported configuration. 
https://eslint.org/

`;

  console.log(`
Everything has been configured.
${SUGGESTIONS_URL}
${PATHS}
${dim(RECOMENDATIONS)}
Then you can have a beer. Cheers! 🍻
`);
}

//#cli
welcomeLog(async () => {
  const packages: PackageInterface[] = await selectPackages();
  const extensions: PackageInterface[] = await selectExtensions(
    packages.filter(({ extensions }) => extensions?.length > 0)
  );
  await configureProject([...packages, ...extensions]);
  endScreen();
});
//#endcli
