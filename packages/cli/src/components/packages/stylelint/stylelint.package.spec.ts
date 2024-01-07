import { StylelintPackage } from './stylelint.package';

describe('StylelintPackage', () => {
  let fixture: StylelintPackage;

  beforeEach(() => {
    fixture = new StylelintPackage();
  });

  test('instance is created', () => {
    expect(fixture).toBeDefined();
  });
});
