import { huskyService } from '../../../services/packages/husky/husky.service.js';
import { HuskyPackage } from './husky.package.js';

jest.mock('../../../services/packages/husky/husky.service.js');

describe('HuskyPackage', () => {
  const fixture = new HuskyPackage();

  test('instance is created', () => {
    expect(fixture).toBeDefined();
  });

  describe('prepare', () => {
    test('should has preconfigure method', () => {
      const function_ = jest.spyOn(fixture, 'preconfigure');
      fixture.preconfigure?.();
      expect(function_).toBeCalled();
    });

    test('should prepare via huskyService', () => {
      expect(huskyService.init).toHaveBeenCalledTimes(0);
      fixture.preconfigure();
      expect(huskyService.init).toHaveBeenCalledTimes(1);
    });
  });
});
