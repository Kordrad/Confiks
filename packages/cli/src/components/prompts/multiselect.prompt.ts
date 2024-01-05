import enquirer from 'enquirer';

import type { Choice } from '../../type/interfaces/choice.interface.js';
import type { Prompt } from '../../type/interfaces/prompt.interface.js';

function normalizeChoices(normalizeArray: Choice[]): Choice[] {
  // eslint-disable-next-line unicorn/no-array-reduce
  return normalizeArray.reduce((previous: Choice[], currentValue: Choice) => {
    const { choices = [], ...rest } = currentValue;
    const nextValue = [
      rest,
      ...(choices?.length > 0 ? normalizeChoices(choices) : []),
    ];
    previous.push(...nextValue);
    return previous;
  }, []);
}

export const MultiSelect = async <T>(options: Omit<Prompt, 'type'>) =>
  await enquirer.prompt<T>({
    ...options,
    ...(typeof options.result === 'function' && { result: options.result }),
    type: 'multiselect',
    choices: normalizeChoices(options.choices),
  });
