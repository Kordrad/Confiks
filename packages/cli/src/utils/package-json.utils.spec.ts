import { fileSystem } from '../services/node/file-system.service.js';
import * as PackageJsonUtils from './package-json.utils.js';

describe('PackageJson Utils', () => {
  describe('packageIsInstalled', () => {
    const packageJson = {
      scripts: {
        shouldNotFound: 'some script that have package name in scripts',
      },
      dependencies: { dependency: '123' },
      devDependencies: { devDependency: '123' },
      peerDependencies: { peerDependencies: '123' },
    };

    jest
      .spyOn(fileSystem, 'readFileSync')
      .mockReturnValue(JSON.stringify(packageJson));

    test('should open the package.json file', () => {
      PackageJsonUtils.packageIsInstalled('');
      expect(fileSystem.readFileSync).toHaveBeenCalledWith('./package.json');
    });

    test('should return false if not found', () => {
      expect(PackageJsonUtils.packageIsInstalled('wrongName')).toBeFalsy();
      expect(
        PackageJsonUtils.packageIsInstalled(packageJson.scripts.shouldNotFound)
      ).toBeFalsy();
    });

    describe('should find packages', () => {
      test.each(
        Object.keys({
          ...packageJson.dependencies,
          ...packageJson.devDependencies,
          ...packageJson.peerDependencies,
        })
      )('should find package %s', packageName => {
        expect(PackageJsonUtils.packageIsInstalled(packageName)).toBeTruthy();
      });
    });
  });
});
