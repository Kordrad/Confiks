import type { HuskyService as Root } from '../husky.service.js';

class HuskyService implements Root {
  addHook = jest.fn();
  init = jest.fn();
}

export const huskyService = new HuskyService();
