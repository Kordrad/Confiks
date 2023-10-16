import type { PackagesEnumKeys } from '../type/enums/packages.enum.js';
import type { Choice } from '../type/interfaces/choice.interface.js';
import type { PackageInterface } from '../type/interfaces/package.interface.js';
import { packageIsInstalled } from '../utils/package-json.utils.js';

export class PackageChoice implements Choice {
  message: string;
  name: PackagesEnumKeys;
  value: unknown;

  // optionals
  enabled?: boolean;
  hint?: string;
  role?: string;

  /**
   *  type string to provides reason why package is disabled to install
   *  @example "Package is already installed"
   * */
  get disabled(): string | boolean {
    if (packageIsInstalled(this.name)) {
      const isInstalled = 'Package is already installed';
      if (this.hint) this.hint = isInstalled;
      return isInstalled;
    }

    return this.#disabled;
  }

  set disabled(value: string | boolean) {
    this.#disabled = value;
  }

  #disabled: string | boolean;

  constructor(
    packageModel: PackageInterface,
    options?: Omit<Choice, 'name' | 'message' | 'value'>
  ) {
    this.name = packageModel.package;
    this.message = packageModel.title;
    this.value = packageModel;

    if (packageModel.description) this.hint = packageModel.description;

    if (!options) return;
    if (options.disabled) this.disabled = options.disabled;
    if (options.enabled) this.enabled = options.enabled;
    if (options.hint) this.hint = options.hint;
    if (options.role) this.role = options.role;
  }
}
