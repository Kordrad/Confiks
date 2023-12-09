import { CommitLintPackage } from '../components/packages/commit-lint/commit-lint.package.js';
import { HuskyPackage } from '../components/packages/husky/husky.package.js';
import { PrettierPackage } from '../components/packages/prettier/prettier.package.js';
import { InitializerService } from './initializer.service';
import { packageManagerService } from './package-manager.service.js';

describe('InitializerService', () => {
  let fixture: InitializerService;
  const somePackages = [
    new HuskyPackage(),
    new PrettierPackage(),
    new CommitLintPackage(),
  ];

  beforeEach(() => {
    fixture = new InitializerService();

    jest
      .spyOn(packageManagerService, 'install')
      .mockImplementation(jest.fn())
      .mockClear();

    for (const package_ of somePackages) {
      jest
        .spyOn(package_, 'configure')
        .mockImplementation(jest.fn())
        .mockClear();
    }
  });

  test('should add packages to variable via addPackages()', () => {
    fixture.addPackages(somePackages);
    expect(fixture.packages).toEqual(somePackages);
  });

  describe('install()', () => {
    test('should be as promise function', () => {
      const function_ = jest.spyOn(fixture, 'install');
      fixture.install().then(() => {
        expect(function_).toHaveBeenCalledTimes(1);
      });
    });

    test('should run packageManagerService.install', () => {
      fixture.install().then(() => {
        expect(packageManagerService.install).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('configure()', () => {
    test('should be as promise function', () => {
      const function_ = jest.spyOn(fixture, 'configure');
      fixture.configure().then(() => {
        expect(function_).toHaveBeenCalledTimes(1);
      });
    });
    test('should run configure() from packages', () => {
      const packagesWithConfigureFunction = somePackages.filter(
        ({ configure }) => typeof configure === 'function'
      );

      fixture.addPackages(packagesWithConfigureFunction);
      fixture.configure().then(() => {
        for (const package_ of packagesWithConfigureFunction) {
          const function_ = jest.spyOn(package_, 'configure');
          expect(function_).toHaveBeenCalled();
        }
      });
    });
  });
});
