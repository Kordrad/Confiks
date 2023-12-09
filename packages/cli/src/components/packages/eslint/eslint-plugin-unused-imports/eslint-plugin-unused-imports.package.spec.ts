import { EslintPackage } from '../eslint.package';
import { EslintPluginUnusedImportsPackage } from './eslint-plugin-unused-imports.package';

describe('EslintPluginUnusedImportsPackage', () => {
  const fixture = new EslintPluginUnusedImportsPackage();

  test('instance is created', () => {
    expect(fixture).toBeDefined();
  });

  test('should be included in parent package', () => {
    expect(new EslintPackage().extensions).toContainEqual(fixture);
  });
});
