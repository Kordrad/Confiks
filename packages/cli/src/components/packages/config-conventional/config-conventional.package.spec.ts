import { CommitLintPackage } from '../commit-lint/commit-lint.package';
import { ConfigConventionalPackage } from './config-conventional.package';

jest.mock('../../../constants/husky-cli.constant');

describe('ConfigConventionalPackage', () => {
  const fixture = new ConfigConventionalPackage();

  test('instance is created', () => {
    expect(fixture).toBeDefined();
  });

  test('should be included in parent package', () => {
    expect(new CommitLintPackage().extensions).toContainEqual(fixture);
  });
});
