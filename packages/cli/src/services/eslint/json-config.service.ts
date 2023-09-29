import type { EslintConfig } from '../../type/interfaces/eslint-config.interface.js';
import { stringify } from '../../utils/json.utils.js';
import { fileSystem } from '../node/file-system.service.js';
import type { ConfigManagement } from './config-management.interface.js';

export class JsonConfigService implements ConfigManagement {
  addExtension(filePath: string, extensions: string[]): void {
    const config: EslintConfig = JSON.parse(fileSystem.readFileSync(filePath));
    fileSystem.writeFile(
      filePath,
      stringify({
        ...config,
        extends: [...(config.extends || []), ...extensions],
      })
    );
  }
}
