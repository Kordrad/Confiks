import { DependencyTypeEnum } from '../type/enums/dependency-type.enum';
import { childProcess } from './node/child-process.service.js';
import { packageManagerService } from './package-menager.service.js';

describe('PackageManagerService', () => {
  const fixture = packageManagerService;

  beforeEach(() => {
    jest
      .spyOn(childProcess, 'execSync')
      .mockImplementation(jest.fn())
      .mockClear();
  });

  test('should not execute install without packages', () => {
    const addPackage = jest.spyOn(fixture, 'addPackage');

    expect(addPackage).not.toHaveBeenCalled();
    fixture.install();
    expect(childProcess.execSync).not.toHaveBeenCalled();
  });

  test.each([
    DependencyTypeEnum.dependency,
    DependencyTypeEnum.devDependency,
    DependencyTypeEnum.global,
  ])('should install package in %s', dependency => {
    fixture.addPackage('husky', dependency);
    fixture.install();
    expect(childProcess.execSync).toHaveBeenCalledWith(
      expect.stringContaining(dependency)
    );
  });
});
