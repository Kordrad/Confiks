/**
 * just copied not exported Choice interface from enquirer
 * @see node_modules/enquirer/index.d.ts:22
 * */
import type { ChoiceState } from './choice-state.interface.js';

export interface Choice<Value = unknown> {
  name: string;
  message?: string;
  value?: Value;
  hint?: string;
  role?: 'separator';
  enabled?: boolean;
  disabled?: boolean | string;
  choices?: Choice<Value>[];
  indent?: string;
  onChoice?: (
    state: ChoiceState<Value>,
    choice: Choice<Value>,
    index: number
  ) => void;
  indicator?:
    | ((
        state: ChoiceState<Value>,
        choice: Choice<Value>,
        index: number
      ) => string)
    | string;
  normalized?: boolean;
  input?: string;
  index?: number;
  cursor?: number;
  level?: number;
  path?: string;
}
