import { fileSystem } from '../services/node/file-system.service.js';

export function packageIsInstalled(packageName: string): boolean {
  const packageJson = JSON.parse(fileSystem.readFileSync('./package.json'));
  return !!packageJson.devDependencies?.[packageName];
}
