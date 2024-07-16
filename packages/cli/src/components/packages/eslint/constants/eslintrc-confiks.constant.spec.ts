import * as PackageJsonUtils from '../../../../utils/package-json.utils.js';
import { EslintPluginPrettierPackage } from '../../eslint-plugin-prettier/eslint-plugin-prettier.package';
import { EslintPluginSimpleImportSortPackage } from '../../eslint-plugin-simple-import-sort/eslint-plugin-simple-import-sort.package';
import { EslintPluginUnicornPackage } from '../../eslint-plugin-unicorn/eslint-plugin-unicorn.package';
import { EslintPluginUnusedImportsPackage } from '../../eslint-plugin-unused-imports/eslint-plugin-unused-imports.package';
import { CONFIG, CONFIG_NAME } from './eslintrc-confiks.constant';

describe('lint-staged constant', () => {
  beforeEach(() => {
    jest
      .spyOn(PackageJsonUtils, 'packageIsInstalled')
      .mockReturnValue(false)
      .mockClear();
  });

  test('config should contains filename', () => {
    expect(CONFIG_NAME).toBeTruthy();
    expect(typeof CONFIG_NAME).toEqual('string');
  });

  test('config should return object type', () => {
    expect(CONFIG()).toBeTruthy();
    expect(typeof CONFIG()).toEqual('object');
  });

  describe('extension configuration', () => {
    test.each([
      {
        packageName: new EslintPluginSimpleImportSortPackage().package,
        plugin: 'simple-import-sort',
      },
      {
        packageName: new EslintPluginUnusedImportsPackage().package,
        plugin: 'unused-imports',
      },
      {
        packageName: new EslintPluginUnicornPackage().package,
        plugin: 'unicorn',
      },
      {
        packageName: new EslintPluginPrettierPackage().package,
        plugin: 'prettier',
      },
    ])('should provide config for $packageName', ({ packageName, plugin }) => {
      jest.spyOn(PackageJsonUtils, 'packageIsInstalled').mockReturnValue(true);
      const config = CONFIG();
      expect(PackageJsonUtils.packageIsInstalled).toHaveBeenCalledWith(
        packageName
      );
      expect(config.plugins.includes(plugin)).toBeTruthy();
    });
  });
});
