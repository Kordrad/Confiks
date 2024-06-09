import chalk from 'chalk';
import figlet from 'figlet';
import gradient from 'gradient-string';

/**
 * CONFIKS
 * @description display styled message as wrapper
 * @example welcome(() => doSomething())
 * */
export function welcomeLog(callback: () => void | Promise<void>): void {
  console.clear();
  figlet(
    `Confiks v1.12.0`,
    {
      font: 'Small',
    },
    (error, data) => {
      console.log(chalk.bold(gradient.summer.multiline(data + '\n')));
      Promise.resolve(callback()).then();
    }
  );
}

/**
 * Display a list of file paths with spacing.
 * @example "aa/bb/cc" -> "    aa/bb/cc"
 * @example "aa/bb/cc" -> "    modified: aa/bb/cc"
 * */
export function pathsLog(string: string, prefix = ''): string {
  return string.replace(/^/gm, `    ${prefix}`);
}
