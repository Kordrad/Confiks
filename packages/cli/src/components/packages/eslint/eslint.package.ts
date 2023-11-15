import { EslintService } from '../../../services/eslint/eslint.service.js';
import { DependencyTypeEnum } from '../../../type/enums/dependency-type.enum.js';
import { stringify } from '../../../utils/json.utils.js';
import { BasePackage } from '../base.package.js';
import IGNORE_CONTENT from './configs/eslintignore.constant.js';
import { eslintPluginPrettier } from './eslint-plugin-prettier/eslint-plugin-prettier.package.js';
import { eslintPluginSimpleImportSort } from './eslint-plugin-simple-import-sort/eslint-plugin-simple-import-sort.package.js';
import { eslintPluginUnicorn } from './eslint-plugin-unicorn/eslint-plugin-unicorn.package.js';
import { eslintPluginUnusedImports } from './eslint-plugin-unused-imports/eslint-plugin-unused-imports.package.js';

export class EslintPackage extends BasePackage {
  readonly title = 'ESLint';
  readonly package = 'eslint';
  readonly dependencyType = DependencyTypeEnum.devDependency;
  readonly description =
    'is a tool for identifying and reporting on patterns found in ECMAScript/JavaScript code. (SUPPORTED: json)';
  readonly extensions = [
    eslintPluginPrettier,
    eslintPluginSimpleImportSort,
    eslintPluginUnicorn,
    eslintPluginUnusedImports,
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

    this.#eslintService.writeConfig(CONFIG_NAME, stringify(CONFIG));
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
    this.#eslintService.addExtensions(this.#eslintService.localFileName, [
      `./${CONFIG_NAME}`,
    ]);
  }

  async #createRootConfig(): Promise<void> {
    const { ROOT_CONFIG, ROOT_CONFIG_NAME } = await import(
      './configs/eslintrc.constant.js'
    );

    this.#eslintService.writeConfig(ROOT_CONFIG_NAME, stringify(ROOT_CONFIG));
  }
}

export const eslint = new EslintPackage();
