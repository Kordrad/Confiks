import {
  AngularEslintSchematicsPackage,
  BiomePackage,
  CommitLintPackage,
  EslintPackage,
  HuskyPackage,
  LintStagedPackage,
  PrettierPackage,
  StylelintPackage,
} from '../components/packages/index.js';
import { packageIsInstalled } from '../utils/package-json.utils.js';

const isAngular = packageIsInstalled('@angular/cli');

const Eslint = isAngular ? AngularEslintSchematicsPackage : EslintPackage;

/* * EXPORTS * */
export const CodeStyleChoices = [new BiomePackage(), new PrettierPackage()];

export const AutomationsChoices = [new HuskyPackage(), new LintStagedPackage()];

export const LintersChoices = [
  new CommitLintPackage(),
  new Eslint(),
  new StylelintPackage(),
];
