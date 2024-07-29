import { CommonPackageAbstract } from '../components/abstract/common-package.abstract';
import { DependencyType } from '../type/types/dependency-type.type';
import { VersionRange } from '../type/types/package-version.type';
import type { Package } from '../type/types/packages.type.js';
import { InitializerService } from './initializer.service.js';
import { PackagerFactory } from './package-manager/packager.factory.js';
import { NpmManager } from './package-manager/packager-managers';

jest
  .spyOn(PackagerFactory.prototype, 'createPackagerManager')
  .mockReturnValue(new NpmManager())
  .mockClear();

const configureMock = jest.fn();
class MockPackage extends CommonPackageAbstract {
  readonly dependencyType: DependencyType = 'devDependency';
  readonly package = 'string' as Package;
  readonly title = 'string';
  configure = configureMock;
  readonly version: VersionRange = '1.2.3';
}

describe('InitializerService', () => {
  let fixture: InitializerService;
  const somePackages = [
    new MockPackage(),
    new MockPackage(),
    new MockPackage(),
  ];

  beforeEach(() => {
    fixture = new InitializerService();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should add packages to variable via addPackages()', () => {
    fixture.addPackages(somePackages);
    expect(fixture.common).toEqual(somePackages);
  });

  describe('configure()', () => {
    test('should run configure() from packages', async () => {
      const packagesWithConfigureFunction = somePackages.filter(
        ({ configure }) => typeof configure === 'function'
      );

      fixture.addPackages(packagesWithConfigureFunction);
      await fixture.configure(); // Waiting for configure to resolve
      for (const package_ of packagesWithConfigureFunction) {
        expect(package_.configure).toHaveBeenCalled();
      }
    });
  });
});
