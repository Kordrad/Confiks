import { DependencyTypeEnum } from '../../type/enums/dependency-type.enum.js';
import { PackagesEnum } from '../../type/enums/packages.enum.js';
import * as childProcess from '../node/child-process.service.js';
import { NpmService } from './npm.service';

jest.mock('../node/child-process.service.js', () => ({
  childProcess: {
    execAsync: jest.fn(),
  },
}));

describe('NpmManagerService', () => {
  let service: NpmService;

  beforeEach(() => {
    service = new NpmService();
    jest.clearAllMocks();
  });

  describe('install', () => {
    it('should call execAsync for each installation type', async () => {
      const spy = jest.spyOn(childProcess.childProcess, 'execAsync');

      await service.install({
        dependency: ['SomePackage'] as unknown as PackagesEnum[],
        devDependency: ['AnotherPackage'] as unknown as PackagesEnum[],
        global: ['ThirdPackage'] as unknown as PackagesEnum[],
      } as never);

      expect(spy).toHaveBeenCalledTimes(3);
      expect(spy).toHaveBeenCalledWith(
        `npm i ${
          service.installationType[DependencyTypeEnum.dependency]
        } SomePackage`
      );
      expect(spy).toHaveBeenCalledWith(
        `npm i ${
          service.installationType[DependencyTypeEnum.devDependency]
        } AnotherPackage`
      );
      expect(spy).toHaveBeenCalledWith(
        `npm i ${
          service.installationType[DependencyTypeEnum.global]
        } ThirdPackage`
      );
    });

    it('should not call execAsync if no packages are provided', async () => {
      const spy = jest.spyOn(childProcess.childProcess, 'execAsync');

      await service.install({
        dependency: [],
        devDependency: [],
        global: [],
      });

      expect(spy).not.toHaveBeenCalled();
    });
  });

  describe('create', () => {
    it('should call execAsync to create automatically config', async () => {
      const mockPackageNameS = ['test'] as never;
      const spy = jest.spyOn(childProcess.childProcess, 'execAsync');

      await service.create(mockPackageNameS);

      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy).toHaveBeenCalledWith(`npm create test`, {
        stderr: false,
      });
    });
  });

  describe('uninstall', () => {
    it('should call execAsync', async () => {
      const mockPackageNameS = ['test', '123'] as never;
      const spy = jest.spyOn(childProcess.childProcess, 'execAsync');

      await service.uninstall(mockPackageNameS);

      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy).toHaveBeenCalledWith(`npm uninstall test 123`);
    });
  });
});
