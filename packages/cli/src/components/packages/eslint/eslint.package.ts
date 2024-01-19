import { EslintService } from '../../../services/packages/eslint/eslint.service.js';
import type { DependencyType } from '../../../type/types/dependency-type.type.js';
import { stringify } from '../../../utils/json.utils.js';
import { BasePackage } from '../base.package.js';
import IGNORE_CONTENT from './configs/eslintignore.constant.js';
import { EslintPluginPrettierPackage } from './eslint-plugin-prettier/eslint-plugin-prettier.package.js';
import { EslintPluginSimpleImportSortPackage } from './eslint-plugin-simple-import-sort/eslint-plugin-simple-import-sort.package.js';
import { EslintPluginUnicornPackage } from './eslint-plugin-unicorn/eslint-plugin-unicorn.package.js';
import { EslintPluginUnusedImportsPackage } from './eslint-plugin-unused-imports/eslint-plugin-unused-imports.package.js';

export class EslintPackage extends BasePackage {
  readonly title = 'ESLint';
  readonly package = 'eslint';
  readonly version = '8';
  readonly dependencyType: DependencyType = 'devDependency';
  readonly description =
    'is a tool for identifying and reporting on patterns found in ECMAScript/JavaScript code. (SUPPORTED: json)';
  readonly extensions = [
    new EslintPluginPrettierPackage(),
    new EslintPluginSimpleImportSortPackage(),
    new EslintPluginUnicornPackage(),
    new EslintPluginUnusedImportsPackage(),
  ];

  readonly #eslintService = new EslintService();

  configure(): void {
    // CONFIG
    this.#prepareCustomConfig().then();
    this.#prepareRootConfig();

    // IGNORE
    this.#eslintService.prepareIgnoreFile(IGNORE_CONTENT);
  }

  async #prepareCustomConfig(): Promise<void> {
    const { CONFIG_NAME, CONFIG } = await import(
      './configs/eslintrc-confiks.constant.js'
    );

    this.#eslintService.writeConfig(CONFIG_NAME, stringify(CONFIG()));
  }

  #prepareRootConfig(): void {
    const configOperation: Promise<void> = this.#eslintService.hasLocalFile
      ? this.#updateRootConfig()
      : this.#createRootConfig();

    configOperation.then();
  }

  async #updateRootConfig(): Promise<void> {
    const { CONFIG_NAME } = await import(
      './configs/eslintrc-confiks.constant.js'
    );
    if (this.#eslintService.localFileName) {
      this.#eslintService.addExtensions(this.#eslintService.localFileName, [
        `./${CONFIG_NAME}`,
      ]);
    }
  }

  async #createRootConfig(): Promise<void> {
    const { ROOT_CONFIG, ROOT_CONFIG_NAME } = await import(
      './configs/eslintrc.constant.js'
    );

    this.#eslintService.writeConfig(ROOT_CONFIG_NAME, stringify(ROOT_CONFIG));
  }
}
