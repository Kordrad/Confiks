import type { ChildProcessService as ChildProcessServiceRoot } from '../child-process.service';

class ChildProcessService implements ChildProcessServiceRoot {
  execSync = jest.fn();
  execAsync = jest.fn();
  exec = jest.fn();
}
export const childProcess = new ChildProcessService();
