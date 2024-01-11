import { huskyService } from '../../../services/packages/husky/husky.service.js';
import { HuskyPackage } from './husky.package.js';

jest.mock('../../../services/packages/husky/husky.service.js');

describe('HuskyPackage', () => {
  const fixture = new HuskyPackage();

  test('instance is created', () => {
    expect(fixture).toBeDefined();
  });

  describe('prepare', () => {
    test('should has prepare method', () => {
      const function_ = jest.spyOn(fixture, 'configure');
      fixture.configure?.();
      expect(function_).toBeCalled();
    });

    test('should prepare via huskyService', () => {
      expect(huskyService.prepare).toHaveBeenCalledTimes(0);
      fixture.configure();
      expect(huskyService.prepare).toHaveBeenCalledTimes(1);
    });
  });
});
