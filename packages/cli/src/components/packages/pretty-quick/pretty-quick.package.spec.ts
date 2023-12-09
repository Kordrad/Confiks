import { huskyService } from '../../../services/packages/husky/husky.service.js';
import * as PackageJsonUtils from '../../../utils/package-json.utils.js';
import { PrettyQuickPackage } from './pretty-quick.package.js';

jest.mock('../../../services/packages/husky/husky.service.js');

describe('PrettyQuick', () => {
  const fixture = new PrettyQuickPackage();

  beforeEach(() => {
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
  });
});
