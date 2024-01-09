import { PackageManagerService } from './package-manager.service';

jest.mock('../node/file-system.service');
jest.mock('../node/child-process.service.js');

describe('PackageManagerService', () => {
  let packageManager: PackageManagerService;

  beforeEach(() => {
    packageManager = new PackageManagerService();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('install', () => {
    it('should call install method in PackageManager', async () => {
      const installSpy = jest.spyOn(packageManager, 'install');

      await packageManager.install({
        dependency: [],
        devDependency: [],
        global: [],
      });

      expect(installSpy).toBeCalled();
    });
  });

  describe('create', () => {
    it('should call install method in PackageManager', async () => {
      const createSpy = jest.spyOn(packageManager, 'create');
      await packageManager.create(['123'] as never);

      expect(createSpy).toBeCalled();
    });
  });
});
