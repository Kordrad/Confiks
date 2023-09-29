import { fileSystem } from '../services/node/file-system.service.js';

export function packageIsInstalled(packageName: string): boolean {
  return fileSystem.readFileSync('./package.json').includes(packageName);
}
