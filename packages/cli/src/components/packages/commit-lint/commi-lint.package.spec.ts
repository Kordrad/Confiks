import { huskyService } from '../../../services/packages/husky/husky.service.js';
import * as PackageJsonUtils from '../../../utils/package-json.utils.js';
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
      const function_ = jest.spyOn(fixture, 'configure');
      fixture.configure?.();
      expect(function_).toBeCalled();
    });

    test('should add pre-commit hook if husky is installed', () => {
      jest
        .spyOn(PackageJsonUtils, 'packageIsInstalled')
        .mockReturnValueOnce(true);

      fixture.configure();
      expect(huskyService.addHook).toHaveBeenCalledWith(
        'commit-msg',
        expect.anything()
      );
    });

    test('should not add pre-commit hook if husky is installed', () => {
      jest
        .spyOn(PackageJsonUtils, 'packageIsInstalled')
        .mockReturnValueOnce(false);

      fixture.configure();
      expect(huskyService.addHook).not.toHaveBeenCalled();
    });
  });
});
