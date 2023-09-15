import { commitLint } from './commit-lint.package';
import { configConventional } from './config-conventional.package';

describe('ConfigConventionalPackage', () => {
  const fixture = configConventional;

  test('instance is created', () => {
    expect(fixture).toBeDefined();
  });

  test('should be included in parent package', () => {
    expect(commitLint.extensions).toContainEqual(fixture);
  });
});
