import { packageIsInstalled } from '../../../utils/package-json.utils.js';
import { EslintPackage } from '../eslint/eslint.package.js';
import { PrettierPackage } from '../prettier/prettier.package.js';

export const CONFIG_NAME = '.lintstagedrc';
export const CONFIG = () => ({
  ...(packageIsInstalled(new PrettierPackage().package) && {
    '*.{json,js,ts,html}': ['prettier --write --ignore-unknown'],
  }),
  ...(packageIsInstalled(new EslintPackage().package) && {
    '*.{js,ts,jsx}': ['eslint --quiet --fix'],
  }),
});
