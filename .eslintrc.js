module.exports = {
  plugins: ['unused-imports', 'simple-import-sort', 'prettier'],
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
  },
  extends: [],
  overrides: [
    {
      env: {
        node: true,
      },
      files: ['.eslintrc.{js,cjs}'],
      parserOptions: {
        sourceType: 'script',
      },
    },
    {
      files: ['*.ts'],
      extends: ['plugin:unicorn/recommended', 'eslint:recommended'],
      rules: {
        'simple-import-sort/imports': 'error',
        'simple-import-sort/exports': 'error',
        'unused-imports/no-unused-imports': 'warn',
      },
    },
  ],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  rules: {},
};
