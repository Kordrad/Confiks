import { fileSystem } from '../services/node/file-system.service.js';

export function packageIsInstalled(packageName: string): boolean {
  const packageJson = JSON.parse(
    fileSystem.readFileSync('./package.json') ?? '{}'
  );
  const packages = Object.keys({
    ...packageJson?.dependencies,
    ...packageJson?.devDependencies,
    ...packageJson?.peerDependencies,
  });
  return packages.includes(packageName);
}
