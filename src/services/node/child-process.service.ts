import * as cp from 'node:child_process';

class ChildProcessService {
  exec(command: string): void {
    cp.exec(command + ' --dry-run', this.#callback);
  }

  execSync(command: string, options?: cp.ExecSyncOptions): string {
    return cp.execSync(command, { encoding: 'utf8', ...options }).toString();
  }

  #callback(
    error: cp.ExecException | null,
    stdout: string,
    stderr: string
  ): void {
    if (error) {
      console.info(`error: ${error.message}`);
      return;
    }
    if (stderr) {
      console.info(`stderr: ${stderr}`);
      return;
    }
    console.info(stdout);
  }
}

export const childProcess = new ChildProcessService();
