import type { EslintConfig } from '../../../type/interfaces/eslint-config.interface.js';
import { fileSystem } from '../../node/file-system.service.js';
import type { ConfigManagement } from './config-management.interface.js';

/**
 * TODO: implement logic to edit .eslintrc.js files;
 */
export class JsConfigService implements ConfigManagement {
  #configRegex =
    /(?:module\.exports\s*=\s*|export\s+default\s*=?\s*)(\[.*?]);/s;

  addExtension(filePath: string, extensions: string[]): void {
    // const config: EslintConfig =
    this.#getArrayConfigs(fileSystem.readFileSync(filePath));
    console.warn(
      `ATTENTION: Add manually ${extensions.join(
        ','
      )} to ${filePath} \n Automatic config extension in 'js' format is not yet supported`
    );
  }

  #getArrayConfigs(config: string): EslintConfig[] | void {
    const configValue = new RegExp(this.#configRegex).exec(config);
    console.log(configValue);
  }
}
