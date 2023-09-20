import { fileSystem } from '../services/node/file-system.service.js';
import * as PackageJsonUtils from './package-json.utils.js';

describe('PackageJson Utils', () => {
  describe('packageIsInstalled', () => {
    jest
      .spyOn(fileSystem, 'readFileSync')

      .mockReturnValue(
        JSON.stringify({
          dependencies: { dependency: '123' },
          devDependencies: { devDependency: '123' },
        })
      );

    test('should open the package.json file', () => {
      PackageJsonUtils.packageIsInstalled('');
      expect(fileSystem.readFileSync).toHaveBeenCalledWith('./package.json');
    });

    test('should find devDependency', () => {
      expect(PackageJsonUtils.packageIsInstalled('devDependency')).toBeTruthy();
      expect(PackageJsonUtils.packageIsInstalled('wrongName')).toBeFalsy();
    });
  });
});
