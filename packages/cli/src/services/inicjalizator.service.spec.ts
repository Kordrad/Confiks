import { commitLint } from '../packages/commit-lint/commit-lint.package.js';
import { husky } from '../packages/husky/husky.package.js';
import { prettier } from '../packages/prettier/prettier.package.js';
import { InitializerService } from './inicjalizator.service.js';
import { packageManagerService } from './package-menager.service.js';

describe('InitializerService', () => {
  let fixture: InitializerService;
  const somePackages = [husky, prettier, commitLint];

  beforeEach(() => {
    fixture = new InitializerService();

    jest.spyOn(packageManagerService, 'install').mockImplementation(jest.fn());

    for (const package_ of somePackages) {
      jest
        .spyOn(package_, 'configure')
        .mockImplementation(jest.fn())
        .mockClear();
    }
  });

  test('should run packageManagerService install method', () => {
    fixture.configureProject();
    expect(packageManagerService.install).toHaveBeenCalledTimes(1);
  });

  test('should configure packages', () => {
    fixture.addPackages(somePackages.map(({ value }) => value));
    fixture.configureProject();

    for (const package_ of somePackages) {
      expect(package_?.configure).toHaveBeenCalledTimes(1);
    }
  });
});
