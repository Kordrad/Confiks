import * as cp from 'node:child_process';

class ChildProcessService {
  execSync(command: string, options?: cp.ExecSyncOptions): string {
    return cp.execSync(command, { encoding: 'utf8', ...options }).toString();
  }
}

export const childProcess = new ChildProcessService();
