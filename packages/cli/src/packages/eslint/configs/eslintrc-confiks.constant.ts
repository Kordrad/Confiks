import type { EslintConfig } from '../../../type/interfaces/eslint-config.interface.js';
import { packageIsInstalled } from '../../../utils/package-json.utils.js';
import { eslintPluginPrettier } from '../eslint-plugin-prettier/eslint-plugin-prettier.package.js';
import { eslintPluginSimpleImportSort } from '../eslint-plugin-simple-import-sort/eslint-plugin-simple-import-sort.package.js';
import { eslintPluginUnicorn } from '../eslint-plugin-unicorn/eslint-plugin-unicorn.package.js';
import { eslintPluginUnusedImports } from '../eslint-plugin-unused-imports/eslint-plugin-unused-imports.package.js';

const hasSimpleSort = packageIsInstalled(eslintPluginSimpleImportSort.package);
const hasUnusedImports = packageIsInstalled(eslintPluginUnusedImports.package);
const hasUnicorn = packageIsInstalled(eslintPluginUnicorn.package);
const hasPrettier = packageIsInstalled(eslintPluginPrettier.package);

const simpleSortConfig: EslintConfig = {
  plugins: hasSimpleSort ? ['simple-import-sort'] : [],
  rules: {
    ...(hasSimpleSort && {
      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error',
    }),
  },
};

const unusedImportsConfig: EslintConfig = {
  plugins: hasUnusedImports ? ['unused-imports'] : [],
  rules: {
    ...(hasUnusedImports && {
      'unused-imports/no-unused-imports': 'warn',
    }),
  },
};

const unicornConfig: EslintConfig = {
  plugins: hasUnicorn ? ['unicorn'] : [],
  rules: {},
};

const prettierConfig: EslintConfig = {
  plugins: hasPrettier ? ['prettier'] : [],
  rules: {
    ...(hasPrettier && {
      'prettier/prettier': [
        'error',
        {
          endOfLine: 'auto',
        },
      ],
    }),
  },
};

export const CONFIG_NAME = '.eslintrc.confiks.json';
export const CONFIG = {
  ignorePatterns: ['**/*'],
  plugins: [
    ...unusedImportsConfig.plugins,
    ...simpleSortConfig.plugins,
    ...prettierConfig.plugins,
    ...unicornConfig.plugins,
  ],
  overrides: [
    {
      files: ['*.ts', '*.tsx', '*.js', '*.jsx'],
      rules: {
        ...simpleSortConfig.rules,
        ...unusedImportsConfig.rules,
        ...unicornConfig.rules,
      },
    },
    {
      files: ['*.ts', '*.tsx', '*.js', '*.jsx', '*.html'],
      rules: {
        ...prettierConfig.rules,
      },
    },
  ],
};
