import type { PackageManagerInterface } from '../../type/interfaces/package-manager.interface.js';
import type { PackageManagerType } from '../../type/types/package-manager-type.type.js';
import { Package } from '../../type/types/packages.type.js';
import * as packageManagerUtils from '../../utils/package-manager.utils.js';
import * as childProcess from '../node/child-process.service.js';
import { PackageManagerService } from './package-manager.service.js';
import { PackagerFactory } from './packager.factory.js';
import { NpmManager, PnpmManager } from './packager-managers';

jest.mock('../node/file-system.service.js');
jest.mock('../node/child-process.service.js');
describe('PackageManagerService', () => {
  let fixture: PackageManagerService;

  beforeEach(() => {
    fixture = new PackageManagerService();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe.each([
    { PM: 'pnpm', PMInstance: new PnpmManager() },
    { PM: 'npm', PMInstance: new NpmManager() },
  ] satisfies {
    PM: PackageManagerType;
    PMInstance: PackageManagerInterface;
  }[])('should do action for $PM', ({ PM, PMInstance }) => {
    beforeEach(() => {
      jest
        .spyOn(packageManagerUtils, 'detectPackageManager')
        .mockReturnValue(PM);
      jest
        .spyOn(PackagerFactory.prototype, 'createPackagerManager')
        .mockReturnValue(PMInstance);
      fixture = new PackageManagerService();
    });

    describe('install', () => {
      it('should call execAsync for each installation type', async () => {
        const spy = jest.spyOn(childProcess.childProcess, 'execAsync');

        await fixture.install({
          dependency: ['SomePackage'] as unknown as Package[],
          devDependency: ['AnotherPackage'] as unknown as Package[],
        } as never);

        const resultsExpected = [
          `${PMInstance.cli.install} ${PMInstance.dependencyInstallation.dependency} SomePackage`,
          `${PMInstance.cli.install} ${PMInstance.dependencyInstallation.devDependency} AnotherPackage`,
        ];

        expect(spy).toHaveBeenCalledTimes(resultsExpected.length);
        for (const [id, expected] of resultsExpected.entries()) {
          expect(spy).toHaveBeenNthCalledWith(id + 1, expected);
        }
      });
    });
    describe('init', () => {
      it('should call execAsync to init automatically config', async () => {
        const mockPackageNameS = ['test'] as never;
        const spy = jest.spyOn(childProcess.childProcess, 'execAsync');

        await fixture.init(mockPackageNameS);

        expect(spy).toHaveBeenCalledTimes(1);
        switch (PM) {
          case 'npm': {
            expect(spy).toHaveBeenCalledWith(`${PMInstance.cli.init} test`, {
              stderr: false,
            });
            break;
          }
          case 'pnpm': {
            expect(spy).toHaveBeenCalledWith(
              `${PMInstance.cli.init} create-test`,
              {
                stderr: false,
              }
            );
            break;
          }
        }
      });
    });

    describe('uninstall', () => {
      it('should call execAsync', async () => {
        const mockPackageNameS = ['test', '123'] as never;
        const spy = jest.spyOn(childProcess.childProcess, 'execAsync');

        await fixture.uninstall(mockPackageNameS);

        expect(spy).toHaveBeenCalledTimes(1);
        expect(spy).toHaveBeenCalledWith(
          `${PMInstance.cli.uninstall} test 123`
        );
      });
    });
  });
});
