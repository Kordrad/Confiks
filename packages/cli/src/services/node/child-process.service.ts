import * as cp from 'node:child_process';

export class ChildProcessService {
  execSync(command: string, options?: cp.ExecSyncOptions): string {
    return cp.execSync(command, { encoding: 'utf8', ...options }).toString();
  }

  execAsync(command: string): Promise<string> {
    return new Promise((resolve, reject) => {
      cp.exec(command, (error, stdout, stderr) => {
        if (error) return reject(error);
        if (stderr) return reject(stderr);
        resolve(stdout);
      });
    });
  }
}

export const childProcess = new ChildProcessService();
