import baseConfig from '../../eslint.config.js';
import jsoncEslintParser from 'jsonc-eslint-parser';

export default [
  ...baseConfig,
  {
    files: ['**/*.json'],
    rules: {
      // TODO: fix
      /*'@nx/dependency-checks': [
        'error',
        {
          ignoredFiles: ['{projectRoot}/eslint.config.{js,cjs,mjs}'],
        },
      ],*/
    },

    languageOptions: { parser: jsoncEslintParser },
  },
  {
    files: ['**/package.json', '**/package.json', '**/generators.json'],
    // TODO: fix
    /*rules: {
      '@nx/nx-plugin-checks': 'error',
    },*/
    languageOptions: { parser: jsoncEslintParser },
  },
];
