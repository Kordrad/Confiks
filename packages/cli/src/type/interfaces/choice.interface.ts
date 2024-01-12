/**
 * just copied not exported Choice interface from enquirer
 * @see node_modules/enquirer/index.d.ts:22
 * */

export interface Choice<Value = unknown> {
  name: string;
  message?: string;
  value?: Value;
  hint?: string;
  role?: 'separator';
  enabled?: boolean;
  disabled?: boolean | string;
  choices?: Choice[];
  indent?: string;
  onChoice?: (state: unknown, choice: Choice, index: number) => void;
  indicator?: (state: unknown, choice: Choice, index: number) => string;
  normalized?: boolean;
  input?: string;
  index?: number;
  cursor?: number;
  level?: number;
  path?: string;
}
