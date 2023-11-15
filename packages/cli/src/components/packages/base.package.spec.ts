/* eslint-disable @typescript-eslint/ban-ts-comment */
import { DependencyTypeEnum } from '../../type/enums/dependency-type.enum.js';
import { BasePackage } from './base.package.js';

class Mock extends BasePackage {
  readonly dependencyType = DependencyTypeEnum.dependency;
  readonly title = 'Mock';
  readonly package = 'husky';

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
});
