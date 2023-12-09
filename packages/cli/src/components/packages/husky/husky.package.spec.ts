import { childProcess } from '../../../services/node/child-process.service.js';
import { HuskyPackage } from './husky.package.js';

describe('HuskyPackage', () => {
  const fixture = new HuskyPackage();

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
      const function_ = jest.spyOn(fixture, 'configure');
      fixture.configure?.();
      expect(function_).toBeCalled();
    });

    test('should prepare via execSync', () => {
      fixture.configure();
      expect(childProcess.execSync).toHaveBeenCalledTimes(2);
    });
  });
});
