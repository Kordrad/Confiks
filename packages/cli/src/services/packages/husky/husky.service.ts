import { childProcess } from '../../node/child-process.service.js';
import { PackageManagerService } from '../../package-manager/package-manager.service.js';

export class HuskyService {
  /**
   * @see https://git-scm.com/docs/githooks
   * @see https://typicode.github.io/husky/getting-started.html
   */
  addHook(
    hook: 'commit-msg' | 'pre-commit',
    content: string,
    folder = '.husky'
  ): void {
    childProcess.execSync(`echo ${content} > ${folder}/${hook}`);
  }

  init(): void {
    new PackageManagerService().exec('husky init');
  }
}

export const huskyService = new HuskyService();
