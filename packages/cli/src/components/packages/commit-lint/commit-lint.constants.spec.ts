import * as PackageJsonUtils from '../../../utils/package-json.utils.js';
import { CONFIG, CONFIG_NAME } from './commit-lint.constants.js';
import { ConfigConventionalPackage } from './config-conventional/config-conventional.package.js';

jest.mock('../../../constants/husky-cli.constant.js');

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
    expect(typeof CONFIG()).toEqual('string');
  });

  test('should provide config for config-conventional', () => {
    const configConventional = new ConfigConventionalPackage();
    jest.spyOn(PackageJsonUtils, 'packageIsInstalled').mockReturnValue(true);
    const config = CONFIG();
    expect(PackageJsonUtils.packageIsInstalled).nthCalledWith(
      1,
      configConventional.package
    );
    expect(config).toMatch(configConventional.package);
  });
});
