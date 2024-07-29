import { fileSystem } from '../../../services/node/file-system.service';
import { PackagerFactory } from '../../../services/package-manager/packager.factory';
import { NpmManager } from '../../../services/package-manager/packager-managers';
import { StylelintPackage } from '../stylelint/stylelint.package';
import { StylelintConfigStandardScssPackage } from './stylelint-config-standard-scss.package';

jest.mock('../../../services/node/file-system.service');

jest
  .spyOn(PackagerFactory.prototype, 'createPackagerManager')
  .mockReturnValue(new NpmManager());

describe('StylelintConfigStandardScssPackage', () => {
  const fixture = new StylelintConfigStandardScssPackage();

  test('instance is created', () => {
    expect(fixture).toBeDefined();
  });

  test('should be included in parent package', () => {
    expect(new StylelintPackage().extensions).toContainEqual(fixture);
  });

  describe('configure', () => {
    test('should has prepare method', () => {
      expect(typeof fixture.configure).toEqual('function');
    });

    test('should replace config to scss ', () => {
      jest
        .spyOn(fileSystem, 'readFileSync')
        .mockReturnValueOnce('{ "extends": ["stylelint-config-standard"] }');

      fixture.configure();
      const writeFileMock = jest.spyOn(fileSystem, 'writeFile');
      expect(writeFileMock).toHaveBeenCalledWith(
        expect.anything(),
        expect.stringContaining(fixture.package)
      );
    });
  });
});
