import type { EslintConfig } from '../../../../type/interfaces/eslint-config.interface.js';
import { packageIsInstalled } from '../../../../utils/package-json.utils.js';
import { EslintPluginPrettierPackage } from '../eslint-plugin-prettier/eslint-plugin-prettier.package.js';
import { EslintPluginSimpleImportSortPackage } from '../eslint-plugin-simple-import-sort/eslint-plugin-simple-import-sort.package.js';
import { EslintPluginUnicornPackage } from '../eslint-plugin-unicorn/eslint-plugin-unicorn.package.js';
import { EslintPluginUnusedImportsPackage } from '../eslint-plugin-unused-imports/eslint-plugin-unused-imports.package.js';

const dumbConfig = {
  plugins: [],
  rules: {},
};
const simpleSortConfig = (): EslintConfig =>
  packageIsInstalled(new EslintPluginSimpleImportSortPackage().package)
    ? {
        plugins: ['simple-import-sort'],
        rules: {
          'simple-import-sort/imports': 'error',
          'simple-import-sort/exports': 'error',
        },
      }
    : dumbConfig;

const unusedImportsConfig = (): EslintConfig =>
  packageIsInstalled(new EslintPluginUnusedImportsPackage().package)
    ? {
        plugins: ['unused-imports'],
        rules: {
          'unused-imports/no-unused-imports': 'warn',
        },
      }
    : dumbConfig;

const unicornConfig = (): EslintConfig =>
  packageIsInstalled(new EslintPluginUnicornPackage().package)
    ? {
        plugins: ['unicorn'],
      }
    : dumbConfig;

const prettierConfig = (): EslintConfig =>
  packageIsInstalled(new EslintPluginPrettierPackage().package)
    ? {
        plugins: ['prettier'],
        rules: {
          'prettier/prettier': [
            'error',
            {
              endOfLine: 'auto',
            },
          ],
        },
      }
    : dumbConfig;

export const CONFIG_NAME = '.eslintrc.confiks.json';
export const CONFIG = () => ({
  ignorePatterns: ['**/*'],
  plugins: [
    ...unusedImportsConfig().plugins,
    ...simpleSortConfig().plugins,
    ...prettierConfig().plugins,
    ...unicornConfig().plugins,
  ],
  overrides: [
    {
      files: ['*.ts', '*.tsx', '*.js', '*.jsx'],
      rules: {
        ...simpleSortConfig().rules,
        ...unusedImportsConfig().rules,
        ...unicornConfig().rules,
      },
    },
    {
      files: ['*.ts', '*.tsx', '*.js', '*.jsx', '*.html'],
      rules: {
        ...prettierConfig().rules,
      },
    },
  ],
});
