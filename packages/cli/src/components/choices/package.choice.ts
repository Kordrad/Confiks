import type { PackagesEnumKeys } from '../../type/enums/packages.enum.js';
import type { Choice } from '../../type/interfaces/choice.interface.js';
import type { PackageInterface } from '../../type/interfaces/package.interface.js';
import { BaseChoice } from './base.choice.js';

/**
 * Represents a package choice for selecting a package.
 * Implements the Choice interface.
 *
 * @class
 * @implements Choice
 */

export class PackageChoice extends BaseChoice implements Choice {
  message: string;
  name: PackagesEnumKeys;
  value: unknown;

  hint: string = '';
  choices: Choice[] = [];
  indent = ' ';

  #childIndent = this.indent + '  ';
  #enabled = false;

  readonly #parentIndicator = '√√';

  constructor(
    packageModel: PackageInterface,
    options?: Pick<Choice, 'hint' | 'indent'>
  ) {
    super();
    this.#initializeProperties(packageModel, options);

    this.indicator = this.indicator.bind(this);
  }

  indicator(state, choice: Choice<PackageInterface>): string | null {
    return this.#hasEnabledChoice(state, choice)
      ? this.#parentIndicator
      : undefined;
  }

  onChoice(state, choice: Choice<PackageInterface>, index: number) {
    this.#enableParent(state, choice, index);
    this.#saveEnabledState(state, choice, index);
  }

  #initializeProperties(
    packageModel: PackageInterface,
    options?: Pick<Choice, 'hint' | 'indent'>
  ): void {
    this.name = packageModel.package;
    this.message = packageModel.title;
    this.value = packageModel;
    if (options?.hint) this.hint = options.hint;
    if (packageModel.description) {
      const version = packageModel.version.startsWith('latest')
        ? packageModel.version
        : `v${packageModel.version}`;

      this.hint = `(${version}) ${packageModel.description || ''}`;
    }

    if (options?.indent) this.indent = options.indent;
    if (packageModel.extensions?.length)
      this.#makeChildrenChoices(packageModel.extensions);
  }

  #makeChildrenChoices(extensions: PackageInterface[]): void {
    for (const extension of extensions)
      this.choices.push(
        new PackageChoice(extension, {
          indent: this.#childIndent,
        })
      );
  }

  #saveEnabledState(
    state,
    choice: Choice<PackageInterface>,
    index: number
  ): void {
    if (state.keypress?.name === 'a')
      this.#enabled = !state.choices.some(({ enabled }) => enabled === false);
    if (
      !(
        state.keypress?.name === 'space' &&
        state.index === index &&
        !this.#hasEnabledChoice(state, choice)
      )
    )
      return;
    this.#enabled = choice.enabled;
  }

  #enableParent(state, choice: Choice<PackageInterface>, index: number): void {
    if (this.#hasEnabledChoice(state, choice)) {
      choice.enabled = true;
    } else if (state.keypress?.name !== 'a' && state.index !== index) {
      choice.enabled = this.#enabled;
    }
  }

  #hasEnabledChoice(state, choice: Choice<PackageInterface>): boolean {
    const depends = choice.value.extensions || [];
    const sameChoices = state.choices.filter(choice =>
      depends.find(
        (extension: PackageInterface) => choice.name === extension.package
      )
    );
    return sameChoices.some(({ enabled }) => enabled);
  }
}
