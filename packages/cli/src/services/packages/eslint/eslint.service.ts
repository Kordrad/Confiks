import { EslintConfigExtensions } from '../../../type/enums/eslint-config-extensions.enum.js';
import { fileSystem } from '../../node/file-system.service.js';
import type { ConfigManagement } from './config-management.interface.js';
import { JsConfigService } from './js-config.service.js';
import { JsonConfigService } from './json-config.service.js';
import { YamlConfigService } from './yaml-config.service.js';

export class EslintService {
  readonly #ignoreFileName = '.eslintignore';

  readonly localFileName = fileSystem.queryFileName('.eslintrc');
  readonly localIgnoreFileName = fileSystem.queryFileName(this.#ignoreFileName);

  readonly #jsonConfigService: ConfigManagement = new JsonConfigService();
  // TODO: add logic for these configurations
  readonly #yamlConfigService: ConfigManagement = new YamlConfigService();
  readonly #jsConfigService: ConfigManagement = new JsConfigService();

  get hasLocalFile(): boolean {
    return !!this.localFileName;
  }

  get hasLocalIgnoreFile(): boolean {
    return !!this.localIgnoreFileName;
  }

  get #localFileExtension(): undefined | EslintConfigExtensions | '' {
    if (!this.hasLocalFile) return undefined;
    if (this.localFileName.split('.').length === 0) return '';
    return this.localFileName.split('.').reverse()[0] as EslintConfigExtensions;
  }

  get #configServiceFactory(): ConfigManagement {
    switch (this.#localFileExtension) {
      case EslintConfigExtensions.json: {
        return this.#jsonConfigService;
      }
      case EslintConfigExtensions.yaml: {
        return this.#yamlConfigService;
      }
      case EslintConfigExtensions.javascript: {
        return this.#jsConfigService;
      }

      default: {
        return this.#jsonConfigService;
      }
    }
  }

  writeConfig(
    fileName: `${string}.${EslintConfigExtensions}`,
    config: string
  ): void {
    fileSystem.writeFile(fileName, config);
  }

  addExtensions(fileName: string, extensions: string[]): void {
    this.#configServiceFactory.addExtension(fileName, extensions);
  }

  prepareIgnoreFile(content: string): void {
    this.hasLocalIgnoreFile
      ? fileSystem.appendFileSync(this.#ignoreFileName, content)
      : fileSystem.writeFile(this.#ignoreFileName, content);
  }
}
