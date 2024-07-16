import type { EslintConfig } from '../../../../type/interfaces/eslint-config.interface.js';
import { stringify } from '../../../../utils/json.utils.js';
import { CONFIG_NAME } from './eslintrc-confiks.constant.js';

const CONFIG = [
  {
    extends: [`./${CONFIG_NAME}`],
    ignorePatterns: ['**/*'],
  },
] satisfies [EslintConfig];

export const ROOT_CONFIG_NAME = 'eslint.config.js';
export const ROOT_CONFIG = `
export default ${stringify(CONFIG)}
`;
