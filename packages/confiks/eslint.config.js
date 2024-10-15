import jsoncEslintParser from 'jsonc-eslint-parser';

// eslint-disable-next-line @nx/enforce-module-boundaries
import baseConfig from '../../eslint.config.js';

export default [
  ...baseConfig,
  {
    files: ['**/*.json'],
    rules: {
      '@nx/dependency-checks': [
        // !FYI: removed from package.json: create-nx-workspace, tslib
        'error',
        {
          ignoredFiles: ['{projectRoot}/eslint.config.{js,cjs,mjs}'],
        },
      ],
    },
    languageOptions: { parser: jsoncEslintParser },
  },
];
