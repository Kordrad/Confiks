import { huskyService } from '../../services/husky.service.js';
import * as PackageJsonUtils from '../../utils/package-json.utils.js';
import { prettyQuick } from './pretty-quick.package.js';

describe('PrettyQuick', () => {
  const fixture = prettyQuick;

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

  describe('configure', () => {
    test('should has configure method', () => {
      const configure = jest.spyOn(fixture, 'configure');
      fixture.configure?.();
      expect(configure).toBeCalled();
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
