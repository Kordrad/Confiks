import { fileSystem } from '../../../services/node/file-system.service.js';
import { PrettierPackage } from './prettier.package';

jest.mock('../../../services/node/file-system.service.js');

describe('Prettier', () => {
  const fixture = new PrettierPackage();

  test('instance is created', () => {
    expect(fixture).toBeDefined();
  });

  describe('prepare', () => {
    let configureFunction: unknown;

    beforeEach(() => {
      configureFunction = jest.spyOn(fixture, 'configure');
      fixture.configure?.();
    });
    test('should has prepare method', () => {
      expect(configureFunction).toBeCalled();
    });

    test('should create files', () => {
      expect(fileSystem.writeFile).toHaveBeenCalledTimes(2);

      for (const [id, fileName] of [
        '.prettierrc',
        '.prettierignore',
      ].entries()) {
        expect(fileSystem.writeFile).toHaveBeenNthCalledWith(
          id + 1,
          fileName,
          expect.anything()
        );
      }
    });
  });
});
