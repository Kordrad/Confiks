import { eslint } from '../eslint.package';
import { eslintPluginUnusedImports } from './eslint-plugin-unused-imports.package';

describe('EslintPluginUnusedImportsPackage', () => {
  const fixture = eslintPluginUnusedImports;

  test('instance is created', () => {
    expect(fixture).toBeDefined();
  });

  test('should be included in parent package', () => {
    expect(eslint.extensions).toContainEqual(fixture);
  });
});
