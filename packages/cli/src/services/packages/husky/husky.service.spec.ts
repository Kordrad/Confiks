import { childProcess } from '../../node/child-process.service.js';
import { HuskyService } from './husky.service.js';

jest.mock('../../node/child-process.service.js');

describe('HuskyService', () => {
  let fixture: HuskyService;

  beforeEach(() => {
    fixture = new HuskyService();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  test('instance is created', () => {
    expect(fixture).toBeDefined();
  });

  describe('addHook', () => {
    test('should call execSync', () => {
      fixture.addHook('commit-msg', 'script test 123');
      expect(childProcess.execSync).toHaveBeenLastCalledWith(
        'echo script test 123 > .husky/commit-msg'
      );
    });

    test('should exec husky command with path', () => {
      fixture.addHook('commit-msg', '');
      expect(childProcess.execSync).toHaveBeenCalledWith(
        expect.stringContaining('.husky/commit-msg')
      );

      fixture.addHook('pre-commit', '', '.custom/folder');
      expect(childProcess.execSync).toHaveBeenCalledWith(
        expect.stringContaining('.custom/folder/pre-commit')
      );
    });
  });

  describe('init', () => {
    test('should call husky init', () => {
      fixture.init();
      expect(childProcess.execSync).toHaveBeenLastCalledWith('npx husky init');
    });
  });
});
