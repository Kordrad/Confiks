import { fileSystem } from '../../../services/node/file-system.service.js';
import { huskyService } from '../../../services/packages/husky/husky.service.js';
import * as PackageJsonUtils from '../../../utils/package-json.utils.js';
import { CONFIG_NAME } from './commit-lint.constants';
import { CommitLintPackage } from './commit-lint.package.js';

jest.mock('../../../services/packages/husky/husky.service.js');
jest.mock('../../../services/node/file-system.service.js');

describe('CommitLintPackage', () => {
  let fixture: CommitLintPackage;

  beforeEach(() => {
    fixture = new CommitLintPackage();
    jest
      .spyOn(PackageJsonUtils, 'packageIsInstalled')
      .mockReturnValue(true)
      .mockClear();
  });

  test('instance is created', () => {
    expect(fixture).toBeDefined();
  });

  describe('configure', () => {
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
      jest.spyOn(PackageJsonUtils, 'packageIsInstalled').mockReturnValue(false);

      fixture.configure();
      expect(huskyService.addHook).not.toHaveBeenCalled();
    });

    test(`should create ${CONFIG_NAME}`, () => {
      fixture.configure();
      expect(fileSystem.writeFile).toHaveBeenCalledWith(
        '.commitlintrc',
        expect.anything()
      );
    });
  });
});
