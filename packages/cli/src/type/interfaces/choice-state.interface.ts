import type { Keypress } from '../types/keypress.type.js';
import type { Choice } from './choice.interface.js';

/**
 * @see https://github.com/enquirer/enquirer/blob/master/lib/state.js
 * */
export interface ChoiceState<T>
  extends Pick<
    Choice<T>,
    'name' | 'message' | 'choices' | 'input' | 'index' | 'cursor'
  > {
  name: 'group';
  message: 'Pick code style packages to install';
  type: string;
  header: string;
  footer: string;
  error: string;
  hint: string;
  input: string;
  cursor: number;
  index: number;
  lines: number;
  tick: number;
  prompt: string;
  buffer: string;
  width: number;
  prefix: '🧼';
  result: () => unknown;
  multiple: boolean;
  readonly symbols: {
    ballotDisabled: '☒';
    ballotOff: '☐';
    ballotOn: '☑';
    bullet: '•';
    bulletWhite: '◦';
    fullBlock: '█';
    heart: '❤';
    identicalTo: '≡';
    line: '─';
    mark: '※';
    middot: '·';
    minus: '−';
    multiplication: '×';
    obelus: '÷';
    pencilDownRight: '✎';
    pencilRight: '✏';
    pencilUpRight: '✐';
    percent: '%';
    pilcrow2: '❡';
    pilcrow: '¶';
    plusMinus: '±';
    question: '?';
    section: '§';
    starsOff: '☆';
    starsOn: '★';
    upDownArrow: '↕';
    check: '√';
    cross: '×';
    ellipsisLarge: '⋯';
    ellipsis: '...';
    info: 'i';
    questionSmall: '?';
    pointer: '>';
    pointerSmall: '»';
    radioOff: '( )';
    radioOn: '(*)';
    warning: '‼';
    upDownDoubleArrow: '⇕';
    upDownDoubleArrow2: '⬍';
    asterisk: '*';
    asterism: '⁂';
    electricArrow: '⌁';
    ellipsisSmall: '…';
    indicator: '√';
    leftAngle: '‹';
    plus: '+';
    pointRight: '☞';
    rightAngle: '›';
    hexagon: { off: '⬡'; on: '⬢'; disabled: '⬢' };
    ballot: { on: '☑'; off: '☐'; disabled: '☒' };
    stars: { on: '★'; off: '☆'; disabled: '☆' };
    folder: { on: '▼'; off: '▶'; disabled: '▶' };
    prefix: { pending: '?'; submitted: '√'; cancelled: '×' };
    separator: { pending: '»'; submitted: '·'; cancelled: '·' };
    radio: { off: '( )'; on: '(*)'; disabled: '(|)' };
    numbers: [
      '⓪',
      '①',
      '②',
      '③',
      '④',
      '⑤',
      '⑥',
      '⑦',
      '⑧',
      '⑨',
      '⑩',
      '⑪',
      '⑫',
      '⑬',
      '⑭',
      '⑮',
      '⑯',
      '⑰',
      '⑱',
      '⑲',
      '⑳',
      '㉑',
      '㉒',
      '㉓',
      '㉔',
      '㉕',
      '㉖',
      '㉗',
      '㉘',
      '㉙',
      '㉚',
      '㉛',
      '㉜',
      '㉝',
      '㉞',
      '㉟',
      '㊱',
      '㊲',
      '㊳',
      '㊴',
      '㊵',
      '㊶',
      '㊷',
      '㊸',
      '㊹',
      '㊺',
      '㊻',
      '㊼',
      '㊽',
      '㊾',
      '㊿',
    ];
  };
  readonly styles: {
    default: { stack: [] };
    noop: { stack: [] };
    inverse: unknown;
    complement: unknown;
    primary: { stack: [] };
    success: { stack: [] };
    danger: { stack: [] };
    strong: { stack: [] };
    warning: { stack: [] };
    muted: { stack: [] };
    disabled: { stack: [] };
    dark: { stack: [] };
    underline: { stack: [] };
    info: unknown;
    em: unknown;
    heading: unknown;
    pending: unknown;
    submitted: unknown;
    cancelled: unknown;
    typing: unknown;
    placeholder: unknown;
    highlight: unknown;
  };
  required: unknown;
  cancelled: boolean;
  submitted: boolean;
  answers: object;
  _choices: Choice<T>[];
  loadingChoices: boolean;
  timer: undefined;
  keypress: Keypress;
}
