#!/usr/bin/env node

//    ____             __ _ _
//   / ___|___  _ __  / _(_) | _____
//  | |   / _ \| '_ \| |_| | |/ / __|
//  | |__| (_) | | | |  _| |   <\__ \
//   \____\___/|_| |_|_| |_|_|\_\___/
//

import chalk from 'chalk';
import gradient from 'gradient-string';
import ora from 'ora';

import { PackageChoice } from './components/choices/package.choice.js';
import { CommitLintPackage } from './components/packages/commit-lint/commit-lint.package.js';
import { EslintPackage } from './components/packages/eslint/eslint.package.js';
import { HuskyPackage } from './components/packages/husky/husky.package.js';
import { LintStagedPackage } from './components/packages/lint-staged/lint-staged.package.js';
import { PrettierPackage } from './components/packages/prettier/prettier.package.js';
import { PrettyQuickPackage } from './components/packages/pretty-quick/pretty-quick.package.js';
import { MultiSelect } from './components/prompts/multiselect.prompt.js';
import { InitializerService } from './services/initializer.service.js';
import { type PackageInterface } from './type/interfaces/package.interface.js';
import { getModifiedFiles, getUntrackedFiles } from './utils/git.utils.js';
import { pathsLog, welcomeLog } from './utils/logs.utils.js';

async function selectPackageGroup({
  prefix,
  message,
  choices,
}: {
  prefix: string;
  message: string;
  choices: PackageChoice[];
}): Promise<PackageInterface[]> {
  const result = await MultiSelect<{ group: PackageInterface[] }>({
    prefix,
    message,
    choices,
    name: 'group',
    result() {
      return this.selected.map(({ value }) => value);
    },
  });
  return result.group;
}

async function selectPackages(): Promise<PackageInterface[]> {
  const codeStyle = await selectPackageGroup({
    prefix: '🧼',
    message: 'Pick code style packages to install',
    choices: [new PackageChoice(new PrettierPackage())],
  });

  const automations = await selectPackageGroup({
    prefix: '🤖',
    message: 'Pick automation packages to install',
    choices: [
      new PackageChoice(new HuskyPackage()),
      new PackageChoice(new LintStagedPackage()),
      new PackageChoice(new PrettyQuickPackage()),
    ],
  });

  const linters = await selectPackageGroup({
    prefix: '🧹',
    message: 'Pick linter packages to install',
    choices: [
      new PackageChoice(new CommitLintPackage()),
      new PackageChoice(new EslintPackage()),
    ],
  });

  return [...codeStyle, ...linters, ...automations];
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

  console.log(`
Everything has been configured.
${SUGGESTIONS_URL}
${PATHS}
Then you can have a beer. Cheers! 🍻
`);
}

//#cli
welcomeLog(async () => {
  await configureProject(await selectPackages());
  endScreen();
});
//#endcli
