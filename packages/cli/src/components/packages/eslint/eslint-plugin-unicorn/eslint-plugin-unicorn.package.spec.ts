import { EslintPackage } from '../eslint.package';
import { EslintPluginUnicornPackage } from './eslint-plugin-unicorn.package';

describe('EslintPluginUnicornPackage', () => {
  const fixture = new EslintPluginUnicornPackage();

  test('instance is created', () => {
    expect(fixture).toBeDefined();
  });

  test('should be included in parent package', () => {
    expect(new EslintPackage().extensions).toContainEqual(fixture);
  });
});
