import { PackageManagerService } from '../services/package-manager/package-manager.service.js';
import type { PackageManagerType } from '../type/types/package-manager-type.type.js';

let _manager: PackageManagerType | undefined;
export function detectPackageManager(): PackageManagerType | undefined {
  if (_manager) return _manager;
  const userAgent = process.env.npm_config_user_agent ?? '';
  const argv = process.argv.join(' ');

  const packageManagers: PackageManagerType[] = ['yarn', 'pnpm', 'npm'];

  const manager = packageManagers.find(
    name => userAgent.includes(name) || argv.includes(name)
  );
  _manager = manager;
  return manager;
}

export function addScripts(scripts: { [key: string]: string }): void {
  // @example 'scripts.test="echo"'
  const parsedScripts: string = Object.entries(scripts)
    .map(([key, value]) => `scripts.${key}="${value}"`)
    .join(' ');
  new PackageManagerService().set(parsedScripts);
}
