import _CONFIG from '../../../constants/lint-staged-cli.constant.js';
import { packageIsInstalled } from '../../../utils/package-json.utils.js';
import { BiomePackage } from '../biome/index.js';
import { EslintPackage } from '../eslint/index.js';
import { PrettierPackage } from '../prettier/index.js';
import {
  StylelintConfigStandardScssPackage,
  StylelintPackage,
} from '../stylelint/index.js';

export const CONFIG_NAME = '.lintstagedrc';
export const CONFIG = () => ({
  ...(packageIsInstalled(new PrettierPackage().package) && _CONFIG.prettier),
  ...(packageIsInstalled(new EslintPackage().package) && _CONFIG.eslint),
  ...(packageIsInstalled(new StylelintPackage().package) &&
  packageIsInstalled(new StylelintConfigStandardScssPackage().package)
    ? _CONFIG.stylelint_scss
    : _CONFIG.stylelint_css),
  ...(packageIsInstalled(new BiomePackage().package) && _CONFIG.biomejs),
});
