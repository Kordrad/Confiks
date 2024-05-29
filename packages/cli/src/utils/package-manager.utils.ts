import type { PackageManagerType } from '../type/types/package-manager-type.type.js';

let _manager: PackageManagerType | undefined;
export function detectPackageManager(): PackageManagerType | undefined {
  if (_manager) return _manager;
  const userAgent = process.env.npm_config_user_agent ?? '';
  const argv = process.argv.join(' ');

  const packageManagers: PackageManagerType[] = ['pnpm', 'npm'];
  const manager = packageManagers.find(
    name => userAgent.includes(name) || argv.includes(name)
  );
  if (manager) {
    _manager = manager;
    return manager;
  }

  _manager = undefined;
  return undefined;
}