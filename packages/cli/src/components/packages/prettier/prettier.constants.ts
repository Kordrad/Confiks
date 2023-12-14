import * as JSON from '../../../utils/json.utils.js';
import { packageIsInstalled } from '../../../utils/package-json.utils.js';
import { PrettierPluginOrganizeAttributesPackage } from './prettier-plugin-organize-attributes/prettier-plugin-organize-attributes.package.js';

const organizeAttributes = new PrettierPluginOrganizeAttributesPackage();
const organizeAttributesPluginCheck = () =>
  packageIsInstalled(organizeAttributes.package)
    ? [organizeAttributes.pluginName]
    : [];

export const CONFIG = (): string => {
  const plugins = [...organizeAttributesPluginCheck()];

  return JSON.stringify({
    ...(plugins.length > 0 && { plugins }),
    tabWidth: 2,
    useTabs: false,
    singleQuote: true,
    semi: true,
    bracketSpacing: true,
    arrowParens: 'avoid',
    trailingComma: 'es5',
    bracketSameLine: true,
    printWidth: 80,
  });
};

export const IGNORE = `# Add files here to ignore them from prettier formatting
/dist
/coverage
.angular
node_modules
`;
