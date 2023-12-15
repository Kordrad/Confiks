import { PrettierPackage } from '../prettier.package.js';
import { PrettierPluginOrganizeAttributesPackage } from './prettier-plugin-organize-attributes.package.js';

describe('PrettierPluginOrganizeAttributesPackage', () => {
  let fixture: PrettierPluginOrganizeAttributesPackage;

  beforeEach(() => {
    fixture = new PrettierPluginOrganizeAttributesPackage();
  });

  test('instance is created', () => {
    expect(fixture).toBeDefined();
  });

  test('should be included in parent package', () => {
    expect(new PrettierPackage().extensions).toContainEqual(fixture);
  });
});
