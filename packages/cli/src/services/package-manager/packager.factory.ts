import type { PackageManagerInterface } from '../../type/interfaces/package-manager.interface.js';
import type { PackageManagerType } from '../../type/types/package-manager-type.type.js';
import {
  NpmManager,
  PnpmManager,
  YarnManager,
} from './packager-managers/index.js';

export class PackagerFactory {
  createPackagerManager(
    type: PackageManagerType | undefined
  ): PackageManagerInterface {
    switch (type) {
      case 'yarn': {
        return new YarnManager();
      }

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
