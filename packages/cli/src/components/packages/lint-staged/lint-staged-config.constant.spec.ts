import * as PackageJsonUtils from '../../../utils/package-json.utils.js';
import { EslintPackage } from '../eslint/index.js';
import { PrettierPackage } from '../prettier/index.js';
import { CONFIG, CONFIG_NAME } from './lint-staged-config.constant.js';

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

  test('should provide config for prettier', () => {
    jest.spyOn(PackageJsonUtils, 'packageIsInstalled').mockReturnValue(true);
    const config = CONFIG();
    expect(PackageJsonUtils.packageIsInstalled).nthCalledWith(
      1,
      new PrettierPackage().package
    );
    expect(JSON.stringify(config)).toMatch('prettier');
  });

  test('should provide config for eslint', () => {
    jest.spyOn(PackageJsonUtils, 'packageIsInstalled').mockReturnValue(true);
    const config = CONFIG();
    expect(PackageJsonUtils.packageIsInstalled).nthCalledWith(
      2,
      new EslintPackage().package
    );
    expect(JSON.stringify(config)).toMatch('eslint');
  });
});
