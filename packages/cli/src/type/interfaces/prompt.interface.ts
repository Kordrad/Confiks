import type { Choice } from './choice.interface.js';

export interface Prompt {
  type: string;
  name: string;
  message: string;
  choices: Choice[];
  prefix?: string;
  result?: () => string | Promise<string>;
}
