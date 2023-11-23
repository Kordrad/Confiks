import { childProcess } from '../../node/child-process.service.js';

class HuskyService {
  /**
   * @see https://git-scm.com/docs/githooks
   * @see https://typicode.github.io/husky/getting-started.html
   */
  addHook(
    hook: 'commit-msg' | 'pre-commit',
    content: string,
    folder = '.husky'
  ): void {
    childProcess.execSync(`npx husky add ${folder}/${hook} "${content}"`);
  }
}

export const huskyService = new HuskyService();
