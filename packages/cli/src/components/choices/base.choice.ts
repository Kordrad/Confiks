import type { Choice } from '../../type/interfaces/choice.interface.js';

export abstract class BaseChoice implements Choice {
  abstract message: string;
  abstract name: string;
  abstract value: unknown;

  protected constructor() {
    this.onChoice = this.onChoice.bind(this);
  }

  abstract onChoice(state: unknown, choice: Choice, index: number): void;
}
