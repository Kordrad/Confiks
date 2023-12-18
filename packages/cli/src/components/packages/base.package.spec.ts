/* eslint-disable @typescript-eslint/ban-ts-comment */
import { DependencyTypeEnum } from '../../type/enums/dependency-type.enum.js';
import { VersionRange } from '../../type/types/package-version.type';
import { BasePackage } from './base.package.js';

class Mock extends BasePackage {
  readonly dependencyType = DependencyTypeEnum.dependency;
  readonly title = 'Mock';
  readonly package = 'husky';
  readonly version: VersionRange = '1.0.0';

  configure(): void {
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

  test('returns correct dependency string', () => {
    const mockPackage = new Mock();

    expect(mockPackage.dependency).toBe('husky@"1.0.0"');
  });
});
