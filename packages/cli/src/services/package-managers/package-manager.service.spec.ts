import { DependencyTypeEnum } from '../../type/enums/dependency-type.enum';
import { PackageManagerService } from './package-manager.service';

jest.mock('../node/file-system.service');

describe('PackageManagerService', () => {
  let packageManager: PackageManagerService;

  beforeEach(() => {
    packageManager = new PackageManagerService();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('#addPackage', () => {
    it('should add a normal dependency', () => {
      packageManager.addPackage('husky', DependencyTypeEnum.dependency);
      expect(packageManager['dependencies']).toContain('husky');
    });

    it('should add a dev dependency', () => {
      packageManager.addPackage('husky', DependencyTypeEnum.devDependency);
      expect(packageManager['devDependencies']).toContain('husky');
    });

    it('should add a global dependency', () => {
      packageManager.addPackage('husky', DependencyTypeEnum.global);
      expect(packageManager['global']).toContain('husky');
    });
  });

  describe('install', () => {
    it('should call .install method in PackageManager', async () => {
      const installSpy = jest.spyOn(packageManager, 'install');

      await packageManager.install();

      expect(installSpy).toBeCalled();
    });
  });
});
