import { EslintService } from '../../../services/packages/eslint/eslint.service.js';
import { CreatorPackageAbstract } from '../../abstract/creator-package.abstract.js';
import { EslintPluginPrettierPackage } from '../eslint-plugin-prettier/eslint-plugin-prettier.package.js';
import { EslintPluginSimpleImportSortPackage } from '../eslint-plugin-simple-import-sort/eslint-plugin-simple-import-sort.package.js';
import { EslintPluginUnicornPackage } from '../eslint-plugin-unicorn/eslint-plugin-unicorn.package.js';
import { EslintPluginUnusedImportsPackage } from '../eslint-plugin-unused-imports/eslint-plugin-unused-imports.package.js';

export class EslintPackage extends CreatorPackageAbstract {
  readonly title = 'ESLint';
  readonly package = '@eslint/config';
  readonly description =
    'is a tool for identifying and reporting on patterns found in ECMAScript/JavaScript code.';

  readonly extensions = [
    new EslintPluginPrettierPackage(),
    new EslintPluginSimpleImportSortPackage(),
    new EslintPluginUnicornPackage(),
    new EslintPluginUnusedImportsPackage(),
  ];

  readonly #eslintService = new EslintService();

  postconfigure(): void {
    this.#prepareCustomConfig().then();
    this.#eslintService.addExtensions();
  }

  async #prepareCustomConfig(): Promise<void> {
    const { CONFIG_NAME, CONFIG } = await import(
      './constants/eslintrc-confiks.constant.js'
    );

    this.#eslintService.writeConfig(CONFIG_NAME, CONFIG());
  }
}
