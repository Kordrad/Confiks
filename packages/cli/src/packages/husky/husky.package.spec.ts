import { childProcess } from '../../services/node/child-process.service.js';
import { husky } from './husky.package.js';

describe('HuskyPackage', () => {
  const fixture = husky;

  test('instance is created', () => {
    expect(fixture).toBeDefined();
  });

  describe('configure', () => {
    beforeEach(() => {
      jest
        .spyOn(childProcess, 'execSync')
        .mockImplementation(jest.fn())
        .mockClear();
    });

    test('should has configure method', () => {
      const configure = jest.spyOn(fixture, 'configure');
      fixture.configure?.();
      expect(configure).toBeCalled();
    });

    test('should configure via execSync', () => {
      fixture.configure();
      expect(childProcess.execSync).toHaveBeenCalledTimes(2);
    });
  });
});
