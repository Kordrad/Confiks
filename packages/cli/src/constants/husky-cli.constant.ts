import type { HuskyCli } from '../type/interfaces/husky-cli.interface.js';
import type { PackageManagerType } from '../type/types/package-manager-type.type.js';
import { detectPackageManager } from '../utils/package-manager.utils.js';

const packageManagers: {
  [packageManager in PackageManagerType]: () => Promise<{ default: HuskyCli }>;
} = {
  yarn: () => import('./husky-cli/yarn.js'),
  npm: () => import('./husky-cli/npm.js'),
  pnpm: () => import('./husky-cli/pnpm.js'),
};

async function factory(
  type: PackageManagerType | undefined
): Promise<HuskyCli> {
  if (!type || !packageManagers[type]) {
    throw new Error(`There is no husky CLI for that package manager`);
  }
  const { default: cli } = await packageManagers[type]();
  return cli;
}

export default await factory(detectPackageManager());
