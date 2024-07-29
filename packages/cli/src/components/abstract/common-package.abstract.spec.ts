/* eslint-disable @typescript-eslint/ban-ts-comment */
import type { DependencyType } from '../../type/types/dependency-type.type';
import { VersionRange } from '../../type/types/package-version.type';
import { CommonPackageAbstract } from './common-package.abstract';

class Mock extends CommonPackageAbstract {
  readonly dependencyType: DependencyType = 'dependency';
  readonly title = 'Mock';
  readonly package = 'husky';
  readonly version: VersionRange = '1.0.0';

  configure(): void {
    // empty
  }
}

describe('CommonPackage', () => {
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
