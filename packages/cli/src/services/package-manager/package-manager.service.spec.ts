import { InstallationType } from '../../type/enums/installation-type.enum';
import { Package } from '../../type/types/packages.type.js';
import * as childProcess from '../node/child-process.service.js';
import * as fileSystem from '../node/file-system.service.js';
import { PackageManagerService } from './package-manager.service.js';

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

  describe.each([{ packageManager: 'pnpm' }, { packageManager: 'npm' }])(
    'should do action for $packageManager',
    ({ packageManager }) => {
      beforeEach(() => {
        jest
          .spyOn(fileSystem.fileSystem, 'queryFileName')
          .mockImplementation(() => {
            return packageManager === 'npm' ? undefined : packageManager;
          });

        fixture = new PackageManagerService();
      });
      describe('install', () => {
        it('should call execAsync for each installation type', async () => {
          const spy = jest.spyOn(childProcess.childProcess, 'execAsync');

          await fixture.install({
            dependency: ['SomePackage'] as unknown as Package[],
            devDependency: ['AnotherPackage'] as unknown as Package[],
            global: ['ThirdPackage'] as unknown as Package[],
          } as never);

          const resultsExpected = [
            `${packageManager} add ${InstallationType.dependency} SomePackage`,
            `${packageManager} add ${InstallationType.developmentDependency} AnotherPackage`,
            `${packageManager} add ${InstallationType.global} ThirdPackage`,
          ];

          expect(spy).toHaveBeenCalledTimes(resultsExpected.length);
          for (const [id, expected] of resultsExpected.entries()) {
            expect(spy).toHaveBeenNthCalledWith(id + 1, expected);
          }
        });
      });

      describe('create', () => {
        it('should call execAsync to create automatically config', async () => {
          const mockPackageNameS = ['test'] as never;
          const spy = jest.spyOn(childProcess.childProcess, 'execAsync');

          await fixture.create(mockPackageNameS);

          expect(spy).toHaveBeenCalledTimes(1);
          expect(spy).toHaveBeenCalledWith(`${packageManager} create test`, {
            stderr: false,
          });
        });
      });

      describe('uninstall', () => {
        it('should call execAsync', async () => {
          const mockPackageNameS = ['test', '123'] as never;
          const spy = jest.spyOn(childProcess.childProcess, 'execAsync');

          await fixture.uninstall(mockPackageNameS);

          expect(spy).toHaveBeenCalledTimes(1);
          expect(spy).toHaveBeenCalledWith(`${packageManager} remove test 123`);
        });
      });
    }
  );
});
