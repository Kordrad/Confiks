/* eslint-disable @typescript-eslint/ban-ts-comment */
import { DependencyTypeEnum } from '../type/enums/dependency-type.enum.js';
import * as PackageJsonUtils from '../utils/package-json.utils.js';
import { BasePackage } from './base.package.js';
import { PACKAGES_MAP } from './packages.const.js';

class Mock extends BasePackage {
  readonly dependencyType = DependencyTypeEnum.dependency;
  readonly name = 'Mock';
  readonly package = 'husky';

  prepare(): void {
    // empty
  }
}

describe('BasePackage', () => {
  let fixture: Mock;

  beforeEach(() => {
    fixture = new Mock();
  });

  test('should create instance', () => {
    expect(fixture).toBeDefined();
  });

  test('Value should be add instance into PACKAGES_MAP', () => {
    const value = fixture.value; // init interaction
    expect(PACKAGES_MAP.has(value)).toBeTruthy();
    expect(PACKAGES_MAP.get(value)).toEqual(fixture);
  });

  describe('disable property', () => {
    test('should return false value if option is available', () => {
      jest
        .spyOn(PackageJsonUtils, 'packageIsInstalled')
        .mockReturnValueOnce(false);
      expect(fixture.disabled).toBeFalsy();
    });

    test('should return the reason if the package is installed', () => {
      jest
        .spyOn(PackageJsonUtils, 'packageIsInstalled')
        .mockReturnValueOnce(true);
      expect(fixture.disabled).toEqual('Package is already installed');
    });
  });
});
