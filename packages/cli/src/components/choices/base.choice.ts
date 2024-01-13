import type { Choice } from '../../type/interfaces/choice.interface.js';
import type { ChoiceState } from '../../type/interfaces/choice-state.interface.js';

export abstract class BaseChoice<T> implements Choice<T> {
  abstract message: string;
  abstract name: string;
  abstract value: T;

  protected constructor() {
    this.onChoice = this.onChoice.bind(this);
  }

  abstract onChoice(
    state: ChoiceState<T>,
    choice: Choice<T>,
    index: number
  ): void;
}
