import { childProcess } from '../../node/child-process.service.js';
import { fileSystem } from '../../node/file-system.service.js';

export class HuskyService {
  readonly #configurationFolder = '.husky';

  get #hasConfigurationFolder(): boolean {
    return fileSystem.hasDirectory(this.#configurationFolder);
  }

  /**
   * @see https://git-scm.com/docs/githooks
   * @see https://typicode.github.io/husky/getting-started.html
   */
  addHook(
    hook: 'commit-msg' | 'pre-commit',
    content: string,
    folder = this.#configurationFolder
  ): void {
    if (!this.#hasConfigurationFolder) this.install();

    childProcess.execSync(`npx husky add ${folder}/${hook} "${content}"`);
  }

  install(): void {
    childProcess.execSync('npx husky install');
  }

  prepare(): void {
    if (!this.#hasConfigurationFolder) this.install();
    childProcess.execSync('npm pkg set scripts.prepare="husky install"');
  }
}

export const huskyService = new HuskyService();
