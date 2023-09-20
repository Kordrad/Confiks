import { childProcess } from '../../services/node/child-process.service.js';
import { husky } from './husky.package.js';

describe('HuskyPackage', () => {
  const fixture = husky;

  test('instance is created', () => {
    expect(fixture).toBeDefined();
  });

  describe('prepare', () => {
    beforeEach(() => {
      jest
        .spyOn(childProcess, 'execSync')
        .mockImplementation(jest.fn())
        .mockClear();
    });

    test('should has prepare method', () => {
      const prepare = jest.spyOn(fixture, 'prepare');
      fixture.prepare?.();
      expect(prepare).toBeCalled();
    });

    test('should prepare via execSync', () => {
      fixture.prepare();
      expect(childProcess.execSync).toHaveBeenCalledTimes(2);
    });
  });
});
