import type { ConfigManagement } from './config-management.interface.js';

/**
 * TODO: implement logic to edit .eslintrc.yml files;
 */
export class YamlConfigService implements ConfigManagement {
  addExtension(filePath: string, extensions: string[]): void {
    console.warn(
      `ATTENTION: Add manually ${extensions.join(
        ','
      )} to ${filePath} \n Automatic config extension in 'yml' format is not yet supported`
    );
  }
}
