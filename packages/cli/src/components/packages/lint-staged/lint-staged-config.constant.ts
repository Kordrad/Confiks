import { packageIsInstalled } from '../../../utils/package-json.utils.js';
import { eslint } from '../eslint/eslint.package.js';
import { prettier } from '../prettier/prettier.package.js';

export const CONFIG_NAME = '.lintstagedrc';
export const CONFIG = () => ({
  ...(packageIsInstalled(prettier.package) && {
    '*.{json,js,ts,html}': ['prettier --write --ignore-unknown'],
  }),
  ...(packageIsInstalled(eslint.package) && {
    '*.{js,ts,jsx}': ['eslint --quiet --fix'],
  }),
});
