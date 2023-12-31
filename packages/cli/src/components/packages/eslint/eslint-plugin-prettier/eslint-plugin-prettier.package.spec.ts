import { EslintPackage } from '../eslint.package';
import { EslintPluginPrettierPackage } from './eslint-plugin-prettier.package';

describe('EslintPluginPrettierPackage', () => {
  const fixture = new EslintPluginPrettierPackage();

  test('instance is created', () => {
    expect(fixture).toBeDefined();
  });

  test('should be included in parent package', () => {
    expect(new EslintPackage().extensions).toContainEqual(fixture);
  });
});
