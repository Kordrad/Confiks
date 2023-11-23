import { EslintService } from '../../../services/packages/eslint/eslint.service.js';
import { EslintPackage } from './eslint.package.js';

jest.mock('../../../services/packages/eslint/eslint.service.js');

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

  describe('configure', () => {
    let writeConfig: jest.Mock;

    beforeEach(() => {
      fixture.configure();
      writeConfig = eslintServiceInstance.writeConfig as jest.Mock;
    });

    describe('custom configuration', () => {
      test('should create .eslintrc.confiks.json', () => {
        expect(writeConfig).toHaveBeenNthCalledWith(
          1,
          '.eslintrc.confiks.json',
          expect.anything()
        );
      });

      test('should provide json type configuration', () => {
        const [, configValue] = writeConfig.mock.calls[0];
        expect(writeConfig).toHaveBeenNthCalledWith(
          1,
          expect.anything(),
          expect.anything()
        );

        expect(JSON.parse(configValue)).not.toBeUndefined();
      });
    });
    describe('root configuration', () => {
      test('should create .eslintrc.json', () => {
        expect(writeConfig).toHaveBeenCalledWith(
          '.eslintrc.json',
          expect.anything()
        );
      });
    });
  });
});
