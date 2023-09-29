import type { ConfigManagement } from './config-management.interface.js';

/**
 * TODO: implement logic to edit .eslintrc.js files;
 */
export class JsConfigService implements ConfigManagement {
  addExtension(filePath: string, extensions: string[]): void {
    console.warn(
      `ATTENTION: Add manually ${extensions.join(
        ','
      )} to ${filePath} \n Automatic config extension in 'js' format is not yet supported`
    );
  }
}
