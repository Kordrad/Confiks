import { fileSystem } from '../../../services/node/file-system.service.js';
import * as packageUtils from '../../../utils/package-json.utils.js';
import { PrettierPackage } from './prettier.package.js';

jest.mock('../../../services/node/file-system.service.js');
jest.mock('../../../utils/package-json.utils.js');

describe('PrettierPackage', () => {
  let prettierPackage: PrettierPackage;

  beforeEach(() => {
    prettierPackage = new PrettierPackage();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create an instance of PrettierPackage', () => {
    expect(prettierPackage).toBeInstanceOf(PrettierPackage);
  });

  it('should have correct properties', () => {
    expect(prettierPackage.title).toEqual('Prettier 🖌️');
    expect(prettierPackage.package).toEqual('prettier');
  });

  describe('configure', () => {
    it('should configure correctly', () => {
      jest.spyOn(packageUtils, 'packageIsInstalled').mockReturnValue(true);

      prettierPackage.configure();

      expect(fileSystem.writeFile).toHaveBeenCalledWith(
        '.prettierrc',
        expect.any(String)
      );
      expect(fileSystem.writeFile).toHaveBeenCalledWith(
        '.prettierignore',
        expect.any(String)
      );
    });
  });
});
