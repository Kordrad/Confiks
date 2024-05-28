import type { PackageManagerInterface } from '../../type/interfaces/package-manager.interface.js';
import type { PackageManagerType } from '../../type/types/package-manager-type.type.js';
import { NpmManager } from './packager-managers/npm.manager.js';
import { PnpmManager } from './packager-managers/pnpm.manager.js';

export class PackagerFactoryService {
  createPackagerManager(
    type: PackageManagerType | undefined
  ): PackageManagerInterface {
    switch (type) {
      case 'npm': {
        return new NpmManager();
      }

      case 'pnpm': {
        return new PnpmManager();
      }

      default: {
        throw new Error(`Unsupported package manager type`);
      }
    }
  }
}
