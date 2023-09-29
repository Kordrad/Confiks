import type { EslintConfig } from '../../../type/interfaces/eslint-config.interface.js';
import { CONFIG_NAME } from './eslintrc-confiks.constant.js';

export const ROOT_CONFIG_NAME = '.eslintrc.json';
export const ROOT_CONFIG = {
  root: true,
  extends: [`./${CONFIG_NAME}`],
  ignorePatterns: ['**/*'],
} satisfies EslintConfig;
