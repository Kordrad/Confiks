import nxFlatBase from '@nx/eslint-plugin/src/flat-configs/base.js';
import nxFlatJavaScript from '@nx/eslint-plugin/src/flat-configs/javascript.js';
import nxFlatTypeScript from '@nx/eslint-plugin/src/flat-configs/typescript.js';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import eslintPluginUnicorn from 'eslint-plugin-unicorn';
import unusedImports from 'eslint-plugin-unused-imports';
import jsoncEslintParser from 'jsonc-eslint-parser';

const unusedImportsConfig = [
  {
    plugins: {
      'unused-imports': unusedImports,
    },
    rules: {
      'no-unused-vars': 'off', // or "@typescript-eslint/no-unused-vars": "off",
      'unused-imports/no-unused-imports': 'warn',
      'unused-imports/no-unused-vars': [
        'warn',
        {
          vars: 'all',
          varsIgnorePattern: '^_',
          args: 'after-used',
          argsIgnorePattern: '^_',
        },
      ],
    },
  },
];

const simpleImportSortConfig = [
  {
    plugins: {
      'simple-import-sort': simpleImportSort,
    },
    rules: {
      'simple-import-sort/imports': 'warn',
      'simple-import-sort/exports': 'warn',
    },
  },
];

const eslintPluginPrettierConfig = [
  eslintPluginPrettierRecommended,
  {
    rules: {
      'prettier/prettier': [
        'warn',
        {
          endOfLine: 'auto',
        },
      ],
    },
  },
];

const eslintPluginUnicornConfig = [
  eslintPluginUnicorn.configs['flat/recommended'],
  {
    rules: {
      'unicorn/prefer-string-replace-all': 'off',
    },
  },
];

const nxConfigs = [
  ...nxFlatBase.default,
  ...nxFlatTypeScript.default,
  ...nxFlatJavaScript.default,
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
    rules: {
      '@nx/enforce-module-boundaries': [
        'error',
        {
          enforceBuildableLibDependency: true,
          allow: [String.raw`^.*!/eslint(\.base)?\.config\.[cm]?js$`],
          depConstraints: [
            {
              sourceTag: '*',
              onlyDependOnLibsWithTags: ['*'],
            },
          ],
        },
      ],
    },
  },
];

export default [
  {
    files: ['**/*.json'],
    // Override or add rules here
    rules: {},
    languageOptions: { parser: jsoncEslintParser },
  },
  ...nxConfigs,
  {
    ignores: ['**/dist'],
  },
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
    // Override or add rules here
    rules: {},
  },
  ...unusedImportsConfig,
  ...simpleImportSortConfig,
  ...eslintPluginPrettierConfig,
  ...eslintPluginUnicornConfig,
];
