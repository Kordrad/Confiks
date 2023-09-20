import { huskyService } from '../../services/husky.service.js';
import * as PackageJsonUtils from '../../utils/package-json.utils.js';
import { commitLint } from './commit-lint.package.js';

describe('CommitLintPackage', () => {
  const fixture = commitLint;

  beforeEach(() => {
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
        'commit-msg',
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
  });
});
