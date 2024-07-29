import * as JSON from '../../../utils/json.utils.js';
import { packageIsInstalled } from '../../../utils/package-json.utils.js';
import { ConfigConventionalPackage } from '../config-conventional/config-conventional.package.js';

const configConventional = new ConfigConventionalPackage();
export const CONFIG_NAME = '.commitlintrc';
export const CONFIG = () => {
  const _extends: string[] = [];

  if (packageIsInstalled(configConventional.package))
    _extends.push(configConventional.package);

  return JSON.stringify({
    ...(_extends.length > 0 && { extends: _extends }),
  });
};
