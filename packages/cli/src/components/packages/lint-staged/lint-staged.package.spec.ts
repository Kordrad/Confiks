import { fileSystem } from '../../../services/node/file-system.service.js';
import { huskyService } from '../../../services/packages/husky/husky.service.js';
import * as PackageJsonUtils from '../../../utils/package-json.utils.js';
import { LintStagedPackage } from './lint-staged.package.js';

jest.mock('../../../services/node/file-system.service.js');
jest.mock('../../../services/packages/husky/husky.service.js');
jest.mock('../../../constants/husky-cli.constant.js');

describe('LintStagedPackage', () => {
  const fixture = new LintStagedPackage();

  beforeEach(() => {
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
        'pre-commit',
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

    test('should create .lintstagedrc', () => {
      fixture.configure();
      new Promise(resolve => setImmediate(resolve)).then(() => {
        expect(fileSystem.writeFile).toHaveBeenCalledWith(
          '.lintstagedrc',
          expect.anything()
        );
      });
    });
  });
});
