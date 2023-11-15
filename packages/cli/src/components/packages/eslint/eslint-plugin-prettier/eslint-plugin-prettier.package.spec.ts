import { eslint } from '../eslint.package';
import { eslintPluginPrettier } from './eslint-plugin-prettier.package';

describe('EslintPluginPrettierPackage', () => {
  const fixture = eslintPluginPrettier;

  test('instance is created', () => {
    expect(fixture).toBeDefined();
  });

  test('should be included in parent package', () => {
    expect(eslint.extensions).toContainEqual(fixture);
  });
});
