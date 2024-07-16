import { EslintConfigExtensions } from '../../../type/enums/eslint-config-extensions.enum.js';
import { fileSystem } from '../../node/file-system.service.js';

export class EslintService {
  readonly #ignoreFileName = '.eslintignore';

  readonly localFileName = fileSystem.queryFileName('eslint.config');
  readonly localIgnoreFileName = fileSystem.queryFileName(this.#ignoreFileName);

  get hasLocalFile(): boolean {
    return !!this.localFileName;
  }

  get hasLocalIgnoreFile(): boolean {
    return !!this.localIgnoreFileName;
  }

  writeConfig(
    fileName: `${string}.${EslintConfigExtensions}`,
    config: string
  ): void {
    fileSystem.writeFile(fileName, config);
  }

  addExtensions(fileName: string, extensions: string[]): void {
    // this.#configServiceFactory.addExtension(fileName, extensions);
  }

  prepareIgnoreFile(content: string): void {
    this.hasLocalIgnoreFile
      ? fileSystem.appendFileSync(this.#ignoreFileName, content)
      : fileSystem.writeFile(this.#ignoreFileName, content);
  }
}
