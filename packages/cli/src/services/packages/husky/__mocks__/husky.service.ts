import type { HuskyService as Root } from '../husky.service.js';

class HuskyService
  implements Omit<Root, '#configurationFolder' | '#hasConfigurationFolder'>
{
  addHook = jest.fn();
  install = jest.fn();
  prepare = jest.fn();
}

export const huskyService = new HuskyService();
