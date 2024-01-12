import type { Choice } from './choice.interface.js';

export interface Prompt<ChoiceType> {
  type: string;
  name: string;
  message: string;
  choices: Choice<ChoiceType>[];
  prefix?: string;
  result?: () => string | Promise<string>;
}
