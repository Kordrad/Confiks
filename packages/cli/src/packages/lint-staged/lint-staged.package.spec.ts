import { huskyService } from '../../services/husky.service.js';
import { fileSystem } from '../../services/node/file-system.service.js';
import * as PackageJsonUtils from '../../utils/package-json.utils.js';
import { lintStaged } from './lint-staged.package.js';

describe('Prettier', () => {
  const fixture = lintStaged;

  beforeEach(() => {
    jest
      .spyOn(fileSystem, 'writeFile')
      .mockImplementation(jest.fn())
      .mockClear();

    jest
      .spyOn(huskyService, 'addHook')
      .mockImplementation(jest.fn())
      .mockClear();

    jest
      .spyOn(PackageJsonUtils, 'packageIsInstalled')
      .mockReturnValue(true)
      .mockClear();
  });

  test('instance is created', () => {
    expect(fixture).toBeDefined();
  });

  describe('prepare', () => {
    test('should has prepare method', () => {
      const prepare = jest.spyOn(fixture, 'prepare');
      fixture.prepare?.();
      expect(prepare).toBeCalled();
    });

    test('should add pre-commit hook if husky is installed', () => {
      jest
        .spyOn(PackageJsonUtils, 'packageIsInstalled')
        .mockReturnValueOnce(true);

      fixture.prepare();
      expect(huskyService.addHook).toHaveBeenCalledWith(
        'pre-commit',
        expect.anything()
      );
    });

    test('should not add pre-commit hook if husky is installed', () => {
      jest
        .spyOn(PackageJsonUtils, 'packageIsInstalled')
        .mockReturnValueOnce(false);

      fixture.prepare();
      expect(huskyService.addHook).not.toHaveBeenCalled();
    });

    test('should create .lintstagedrc', () => {
      fixture.prepare();
      expect(fileSystem.writeFile).toHaveBeenCalledWith(
        '.lintstagedrc',
        expect.anything()
      );
    });
  });
});
