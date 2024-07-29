import type { Choice } from '../../type/interfaces/choice.interface.js';
import type { ChoiceState } from '../../type/interfaces/choice-state.interface.js';
import type {
  AngularSchematicInterface,
  CommonPackageInterface,
  CreatorPackageInterface,
} from '../../type/interfaces/package.interface.js';
import type { Package } from '../../type/types/packages.type.js';
import { BaseChoice } from './base.choice.js';

/**
 * Represents a package choice for selecting a package.
 * Implements the Choice interface.
 *
 * @class
 * @implements Choice
 */

type PackageType =
  | CommonPackageInterface
  | CreatorPackageInterface
  | AngularSchematicInterface;

export class PackageChoice
  extends BaseChoice<PackageType>
  implements Choice<PackageType>
{
  message!: string;
  name!: Package;
  value!: PackageType;

  hint = '';
  choices: Choice<PackageType>[] = [];
  indent = ' ';

  #childIndent = this.indent + '  ';
  #enabled = false;

  readonly #parentIndicator = '√√';

  constructor(
    packageModel: PackageType,
    options?: Pick<Choice, 'hint' | 'indent'>
  ) {
    super();
    this.#initializeProperties(packageModel, options);

    this.indicator = this.indicator.bind(this);
  }

  indicator(
    state: ChoiceState<PackageType>,
    choice: Choice<PackageType>
  ): string {
    return this.#hasEnabledChoice(state, choice)
      ? this.#parentIndicator
      : state.symbols.indicator;
  }

  onChoice(
    state: ChoiceState<PackageType>,
    choice: Choice<PackageType>,
    index: number
  ) {
    this.#enableParent(state, choice, index);
    this.#saveEnabledState(state, choice, index);
  }

  #initializeProperties(
    packageModel: PackageType,
    options?: Pick<Choice, 'hint' | 'indent'>
  ): void {
    this.name = packageModel.package;
    this.message = packageModel.title;
    this.value = packageModel;
    if (options?.hint) this.hint = options.hint;
    if (packageModel.description) {
      const version = (packageModel as CommonPackageInterface).version;
      const versionTemplate = version ? `(v${version})` : '';
      const description = packageModel.description || '';

      this.hint = `${versionTemplate} ${description}`.trim();
    }

    if (options?.indent) this.indent = options.indent;
    if (packageModel.extensions?.length)
      this.#makeChildrenChoices(packageModel.extensions);
  }

  #makeChildrenChoices(extensions: PackageType[]): void {
    for (const extension of extensions)
      this.choices.push(
        new PackageChoice(extension, {
          indent: this.#childIndent,
        })
      );
  }

  #saveEnabledState(
    state: ChoiceState<PackageType>,
    choice: Choice<PackageType>,
    index: number
  ): void {
    if (state.keypress?.name === 'a' && state.choices?.length)
      this.#enabled = !state.choices.some(({ enabled }) => enabled === false);

    if (
      !(
        state.keypress?.name === 'space' &&
        state.index === index &&
        !this.#hasEnabledChoice(state, choice)
      )
    ) {
      return;
    }
    this.#enabled = Boolean(choice.enabled);
  }

  #enableParent(
    state: ChoiceState<PackageType>,
    choice: Choice<PackageType>,
    index: number
  ): void {
    if (this.#hasEnabledChoice(state, choice)) {
      choice.enabled = true;
    } else if (state.keypress?.name !== 'a' && state.index !== index) {
      choice.enabled = this.#enabled;
    }
  }

  #hasEnabledChoice(
    state: ChoiceState<PackageType>,
    choice: Choice<PackageType>
  ): boolean {
    const depends = choice.value?.extensions || [];
    const sameChoices = state.choices?.filter(choice =>
      depends.find(
        (extension: PackageType) => choice.name === extension.package
      )
    );
    return sameChoices?.some(({ enabled }) => enabled) || false;
  }
}
