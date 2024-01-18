import { BasePackage } from '../components/packages/base.package';
import { PackagesKeys } from '../type/enums/packages.enum';
import { VersionRange } from '../type/types/package-version.type';
import { InitializerService } from './initializer.service';

const configureMock = jest.fn();
class MockPackage extends BasePackage {
  readonly dependencyType = 0;
  readonly package = 'string' as PackagesKeys;
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
    expect(fixture.packages).toEqual(somePackages);
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
