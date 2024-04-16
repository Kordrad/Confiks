import {
  ESLINT_FIX,
  PRETTIER_FIX,
  STYLELINT_FIX,
} from '../../../constants/lint-staged-cli.constant.js';
import { packageIsInstalled } from '../../../utils/package-json.utils.js';
import { EslintPackage } from '../eslint/index.js';
import { PrettierPackage } from '../prettier/index.js';
import {
  StylelintConfigStandardScssPackage,
  StylelintPackage,
} from '../stylelint/index.js';

export const CONFIG_NAME = '.lintstagedrc';
export const CONFIG = () => ({
  ...(packageIsInstalled(new PrettierPackage().package) && {
    '*.{json,js,ts,html}': [PRETTIER_FIX],
  }),
  ...(packageIsInstalled(new EslintPackage().package) && {
    '*.{js,ts,jsx}': [ESLINT_FIX],
  }),
  ...(packageIsInstalled(new StylelintPackage().package) && {
    [packageIsInstalled(new StylelintConfigStandardScssPackage().package)
      ? '*.{css,scss}'
      : '*.{css}']: [STYLELINT_FIX],
  }),
});
