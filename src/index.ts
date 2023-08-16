import * as cp from 'node:child_process';

async function loadMyModule() {
  const { default: inquirer } = await import('inquirer');

  inquirer
    .prompt([
      {
        type: 'checkbox',
        message: 'packages to install:',
        name: 'packages',
        choices: [
          new inquirer.Separator('Commitlint'),
          { name: '@commitlint/cli' },
          { name: '@commitlint/config-conventional' },
          new inquirer.Separator('Other'),
          { name: 'husky' },
          { name: 'lint-staged' },
        ],
      },
    ])
    .then(answers => {
      cp.exec(
        `npm i -D ${answers.packages.join(' ')}`,
        (error: cp.ExecException | null, stdout: string, stderr: string) => {
          if (error) {
            console.log(`error: ${error.message}`);
            return;
          }
          if (stderr) {
            console.log(`stderr: ${stderr}`);
            return;
          }
          console.log(stdout);
        }
      );
    });
}

// eslint-disable-next-line unicorn/prefer-top-level-await
loadMyModule().then();
