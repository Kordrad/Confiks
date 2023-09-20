import { fileSystem } from '../../services/node/file-system.service.js';
import { prettier } from './prettier.package';

describe('Prettier', () => {
  const fixture = prettier;

  beforeEach(() => {
    jest
      .spyOn(fileSystem, 'writeFile')
      .mockImplementation(jest.fn())
      .mockClear();
  });

  test('instance is created', () => {
    expect(fixture).toBeDefined();
  });

  describe('prepare', () => {
    let prepareFunction: unknown;

    beforeEach(() => {
      prepareFunction = jest.spyOn(fixture, 'prepare');
      fixture.prepare?.();
    });
    test('should has prepare method', () => {
      expect(prepareFunction).toBeCalled();
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
