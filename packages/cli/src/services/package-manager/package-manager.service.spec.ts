import { PackageManagerInterface } from '../../type/interfaces/package-manager.interface';
import { PackageManagerType } from '../../type/types/package-manager-type.type';
import { Package } from '../../type/types/packages.type.js';
import * as packageManagerUtils from '../../utils/package-manager.utils.js';
import * as childProcess from '../node/child-process.service.js';
import { PackageManagerService } from './package-manager.service.js';
import { PackagerFactory } from './packager.factory.js';
import {
  NpmManager,
  PnpmManager,
  YarnManager,
} from './packager-managers/index.js';

jest.mock('../node/file-system.service.js');
jest.mock('../node/child-process.service.js');

describe('PackageManagerService', () => {
  let fixture: PackageManagerService;

  describe.each([
    { PM: 'pnpm', pmInstance: new PnpmManager() },
    { PM: 'npm', pmInstance: new NpmManager() },
    { PM: 'yarn', pmInstance: new YarnManager() },
  ] satisfies {
    PM: PackageManagerType;
    pmInstance: PackageManagerInterface;
  }[])('should do action for $PM', ({ PM, pmInstance }) => {
    beforeEach(() => {
      jest
        .spyOn(packageManagerUtils, 'detectPackageManager')
        .mockReturnValue(PM);

      jest
        .spyOn(PackagerFactory.prototype, 'createPackagerManager')
        .mockReturnValue(pmInstance);

      fixture = new PackageManagerService();
    });

    describe('install', () => {
      it('should call exec for each installation type', async () => {
        const spy = jest.spyOn(childProcess.childProcess, 'exec');

        await fixture.install({
          dependency: ['SomePackage'] as unknown as Package[],
          devDependency: ['AnotherPackage'] as unknown as Package[],
        } as never);

        const resultsExpected = [
          `${pmInstance.cli.install} ${pmInstance.dependencyInstallation.dependency} SomePackage`,
          `${pmInstance.cli.install} ${pmInstance.dependencyInstallation.devDependency} AnotherPackage`,
        ];

        expect(spy).toHaveBeenCalledTimes(resultsExpected.length);
        for (const [id, expected] of resultsExpected.entries()) {
          expect(spy).toHaveBeenNthCalledWith(id + 1, expected);
        }
      });
    });

    describe('init', () => {
      it('should call exec to init automatically config', async () => {
        const mockPackageNameS = ['test'] as never;
        const spy = jest.spyOn(childProcess.childProcess, 'execAsync');

        await fixture.init(mockPackageNameS);

        expect(spy).toHaveBeenCalledTimes(1);
        switch (PM) {
          case 'yarn':
          case 'npm': {
            expect(spy).toHaveBeenCalledWith(`${pmInstance.cli.init} test`, {
              stdio: 'inherit',
            });
            break;
          }
          case 'pnpm': {
            expect(spy).toHaveBeenCalledWith(
              `${pmInstance.cli.init} create-test`,
              {
                stdio: 'inherit',
              }
            );
            break;
          }
        }
      });
    });

    describe('uninstall', () => {
      it('should call exec', async () => {
        const mockPackageNameS = ['test', '123'] as never;
        const spy = jest.spyOn(childProcess.childProcess, 'exec');

        await fixture.uninstall(mockPackageNameS);

        expect(spy).toHaveBeenCalledTimes(1);
        expect(spy).toHaveBeenCalledWith(
          `${pmInstance.cli.uninstall} test 123`
        );
      });
    });
  });
});
