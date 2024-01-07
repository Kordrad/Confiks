import { packageIsInstalled } from '../../../utils/package-json.utils.js';
import { ConfigConventionalPackage } from './config-conventional/config-conventional.package.js';

const configConventional = new ConfigConventionalPackage();
export const CONFIG_NAME = 'commitlint.config.js';
export const CONFIG = () => {
  const configConventionalExtension = packageIsInstalled(
    configConventional.package
  )
    ? `'${configConventional.package}'`
    : '';

  return `module.exports = { extends: [${configConventionalExtension}] };`;
};
