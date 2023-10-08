/**
 * just copied not exported Choice interface from enquirer
 * @see node_modules/enquirer/index.d.ts:22
 * */

export interface Choice {
  name: string;
  message?: string;
  value?: unknown;
  hint?: string;
  role?: string;
  enabled?: boolean;
  disabled?: boolean | string;
}
