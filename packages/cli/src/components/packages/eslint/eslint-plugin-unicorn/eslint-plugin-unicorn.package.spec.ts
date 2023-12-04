import { eslint } from '../eslint.package';
import { EslintPluginUnicornPackage } from './eslint-plugin-unicorn.package';

describe('EslintPluginUnicornPackage', () => {
  const fixture = new EslintPluginUnicornPackage();

  test('instance is created', () => {
    expect(fixture).toBeDefined();
  });

  test('should be included in parent package', () => {
    expect(eslint.extensions).toContainEqual(fixture);
  });
});
