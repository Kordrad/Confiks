import enquirer from 'enquirer';

import type { Choice } from '../../type/interfaces/choice.interface.js';
import type { Prompt } from '../../type/interfaces/prompt.interface.js';

function normalizeChoices<T>(normalizeArray: Choice<T>[]): Choice<T>[] {
  // eslint-disable-next-line unicorn/no-array-reduce
  return normalizeArray.reduce(
    (previous: Choice<T>[], currentValue: Choice<T>) => {
      const { choices = [], ...rest } = currentValue;
      const nextValue = [
        rest,
        ...(choices?.length > 0 ? normalizeChoices(choices) : []),
      ];
      previous.push(...nextValue);
      return previous;
    },
    []
  );
}

export const MultiSelect = async <T, Value>(
  options: Omit<Prompt<Value>, 'type'>
) =>
  await enquirer.prompt<T>({
    ...options,
    ...(typeof options.result === 'function' && { result: options.result }),
    type: 'multiselect',
    choices: normalizeChoices<Value>(options.choices),
  });
