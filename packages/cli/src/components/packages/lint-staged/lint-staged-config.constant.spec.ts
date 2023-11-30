import * as PackageJsonUtils from '../../../utils/package-json.utils.js';
import { eslint } from '../eslint/eslint.package.js';
import { prettier } from '../prettier/prettier.package.js';
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
      prettier.package
    );
    expect(JSON.stringify(config)).toMatch('prettier');
  });

  test('should provide config for eslint', () => {
    jest.spyOn(PackageJsonUtils, 'packageIsInstalled').mockReturnValue(true);
    const config = CONFIG();
    expect(PackageJsonUtils.packageIsInstalled).nthCalledWith(
      2,
      eslint.package
    );
    expect(JSON.stringify(config)).toMatch('eslint');
  });
});
