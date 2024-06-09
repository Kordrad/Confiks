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
  console.log('TEST123:', userAgent, argv);
  _manager = manager;
  return manager;
}
