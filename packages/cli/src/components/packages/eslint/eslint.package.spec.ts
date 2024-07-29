import { PackagerFactory } from '../../../services/package-manager/packager.factory';
import { NpmManager } from '../../../services/package-manager/packager-managers';
import { EslintService } from '../../../services/packages/eslint/eslint.service.js';
import { EslintPackage } from './eslint.package.js';

jest.mock('../../../services/packages/eslint/eslint.service.js');
jest.mock('../../../services/node/child-process.service.js');

describe('EslintPackage', () => {
  let fixture: EslintPackage;
  let eslintServiceMock: jest.MockedObjectDeep<typeof EslintService>;
  let eslintServiceInstance: EslintService;

  beforeEach(() => {
    fixture = new EslintPackage();
    eslintServiceMock = jest.mocked(EslintService);
    eslintServiceInstance = eslintServiceMock.mock.instances[0];
  });

  afterEach(() => {
    eslintServiceMock.mockClear();
    jest.restoreAllMocks();
  });

  test('instances is created', () => {
    expect(fixture).toBeDefined();
    expect(eslintServiceMock).toHaveBeenCalled();
  });

  describe('postconfigure', () => {
    let writeConfig: jest.Mock;

    beforeEach(() => {
      fixture.postconfigure();
      writeConfig = eslintServiceInstance.writeConfig as jest.Mock;
      jest
        .spyOn(PackagerFactory.prototype, 'createPackagerManager')
        .mockReturnValue(new NpmManager());
    });

    describe('custom configuration', () => {
      test('should create .eslintrc.confiks.js', () => {
        expect(writeConfig).toHaveBeenNthCalledWith(
          1,
          '.eslintrc.confiks.js',
          expect.anything()
        );
      });
    });
  });
});
