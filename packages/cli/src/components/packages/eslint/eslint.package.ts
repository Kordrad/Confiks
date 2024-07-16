import { ESLINT_SCRIPTS } from '../../../constants/package-scripts-cli.constant.js';
import { EslintService } from '../../../services/packages/eslint/eslint.service.js';
import { stringify } from '../../../utils/json.utils.js';
import { addScripts } from '../../../utils/package-manager.utils.js';
import { CreatorPackageAbstract } from '../../abstract/creator-package.abstract.js';
import { EslintPluginPrettierPackage } from '../eslint-plugin-prettier/eslint-plugin-prettier.package.js';
import { EslintPluginSimpleImportSortPackage } from '../eslint-plugin-simple-import-sort/eslint-plugin-simple-import-sort.package.js';
import { EslintPluginUnicornPackage } from '../eslint-plugin-unicorn/eslint-plugin-unicorn.package.js';
import { EslintPluginUnusedImportsPackage } from '../eslint-plugin-unused-imports/eslint-plugin-unused-imports.package.js';
import IGNORE_CONTENT from './constants/eslintignore.constant.js';

export class EslintPackage extends CreatorPackageAbstract {
  readonly title = 'ESLint';
  readonly package = 'eslint';
  readonly description =
    'is a tool for identifying and reporting on patterns found in ECMAScript/JavaScript code.';

  readonly extensions = [
    new EslintPluginPrettierPackage(),
    new EslintPluginSimpleImportSortPackage(),
    new EslintPluginUnicornPackage(),
    new EslintPluginUnusedImportsPackage(),
  ];

  readonly #eslintService = new EslintService();

  configure(): void {
    // IGNORE
    this.#eslintService.prepareIgnoreFile(IGNORE_CONTENT);

    addScripts(ESLINT_SCRIPTS);
  }

  postconfigure(): void {
    this.#prepareCustomConfig().then();
  }

  async #prepareCustomConfig(): Promise<void> {
    const { CONFIG_NAME, CONFIG } = await import(
      './constants/eslintrc-confiks.constant.js'
    );

    this.#eslintService.writeConfig(CONFIG_NAME, stringify(CONFIG()));
  }

  /*  #prepareRootConfig(): void {
    const configOperation: Promise<void> = this.#eslintService.hasLocalFile
      ? this.#updateRootConfig()
      : this.#createRootConfig();

    configOperation.then();
  }*/

  /*async #updateRootConfig(): Promise<void> {
    const { CONFIG_NAME } = await import(
      './constants/eslintrc-confiks.constant.js'
    );
    if (this.#eslintService.localFileName) {
      this.#eslintService.addExtensions(this.#eslintService.localFileName, [
        `./${CONFIG_NAME}`,
      ]);
    }
  }*/

  /* async #createRootConfig(): Promise<void> {
    const { ROOT_CONFIG, ROOT_CONFIG_NAME } = await import(
      './constants/eslintrc.constant.js'
    );

    this.#eslintService.writeConfig(ROOT_CONFIG_NAME, ROOT_CONFIG);
  }*/
}
