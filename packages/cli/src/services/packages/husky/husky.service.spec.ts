import { childProcess } from '../../node/child-process.service.js';
import { huskyService } from './husky.service.js';

describe('HuskyService', () => {
  const fixture = huskyService;
  test('instance is created', () => {
    expect(fixture).toBeDefined();
  });

  describe('addHook', () => {
    beforeEach(() => {
      jest.spyOn(childProcess, 'execSync').mockImplementation(jest.fn());
    });

    test('should call execSync', () => {
      fixture.addHook('commit-msg', '');
      expect(childProcess.execSync).toHaveBeenCalledTimes(1);
    });

    test('should exec husky command', () => {
      fixture.addHook('commit-msg', '');
      expect(childProcess.execSync).toHaveBeenCalledWith(
        expect.stringContaining('npx husky add')
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
});
