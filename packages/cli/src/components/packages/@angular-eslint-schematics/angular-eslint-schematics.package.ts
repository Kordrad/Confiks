import { AngularSchematicsAbstract } from '../../abstract/angular-schematics.abstract.js';
import { EslintPluginPrettierPackage } from '../eslint-plugin-prettier/eslint-plugin-prettier.package.js';
import { EslintPluginSimpleImportSortPackage } from '../eslint-plugin-simple-import-sort/eslint-plugin-simple-import-sort.package.js';
import { EslintPluginUnicornPackage } from '../eslint-plugin-unicorn/eslint-plugin-unicorn.package.js';
import { EslintPluginUnusedImportsPackage } from '../eslint-plugin-unused-imports/eslint-plugin-unused-imports.package.js';

export class AngularEslintSchematicsPackage extends AngularSchematicsAbstract {
  readonly title = 'Angular ESLint 🅰️';
  readonly package = '@angular-eslint/schematics';
  readonly description = 'Enables ESLint to lint Angular projects';

  readonly extensions = [
    new EslintPluginPrettierPackage(),
    new EslintPluginSimpleImportSortPackage(),
    new EslintPluginUnicornPackage(),
    new EslintPluginUnusedImportsPackage(),
  ];
}
