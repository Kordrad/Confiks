import { stringify } from '../../utils/json.utils.js';
import { fileSystem } from '../node/file-system.service.js';

export class StylelintService {
  localConfigName = fileSystem.queryFileName('.stylelintrc.json');

  get hasLocalFile(): boolean {
    return !!this.localConfigName;
  }
  addExtension(extensions: string[]): void {
    if (!this.hasLocalFile) {
      return;
    }

    const config = JSON.parse(fileSystem.readFileSync(this.localConfigName));
    fileSystem.writeFile(
      this.localConfigName,
      stringify({
        ...config,
        extends: [...(config.extends || []), ...extensions],
      })
    );
  }
}
