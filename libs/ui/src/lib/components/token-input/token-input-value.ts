/**
 * A token: one unit in the text — a person mentioned, a file attached — that
 * moves, deletes and copies whole.
 */
export interface ScToken {
  /** Its kind (`mention`, `file`…): `data-token-type` on its chip. */
  readonly type: string;
  /** What it stands for (an id, a path). */
  readonly value: string;
  /** What it shows, and what is read. */
  readonly label: string;
  /** Given one when missing. */
  readonly id?: string;
  /** Still loading (`pending`), or not found (`unresolved`). */
  readonly status?: 'pending' | 'unresolved';
}

/** The text and its tokens, in order. */
export type ScTokenInputValue = readonly (string | ScToken)[];

/** Turns tokens into text and back: copy, paste, and what a server reads. */
export interface ScTokenCodec {
  format(token: ScToken): string;
  parse(text: string): ScTokenInputValue;
}

/** What Backspace and Delete do to a token next to the caret. */
export type ScTokenDeletion = 'whole' | 'select' | 'revert';

/** Why the value changed. */
export type ScTokenInputReason =
  | 'input-change'
  | 'paste'
  | 'cut'
  | 'undo'
  | 'redo'
  | 'remove-press'
  | 'item-press'
  | 'revert'
  | 'imperative';

/** The last change: why, and the tokens it added and removed. */
export interface ScTokenInputChange {
  readonly reason: ScTokenInputReason;
  readonly added: readonly ScToken[];
  readonly removed: readonly ScToken[];
}

let nextId = 0;

/** The token, with an id. */
export function scTokenWithId(token: ScToken): ScToken {
  return token.id ? token : { ...token, id: `sc-token-${nextId++}` };
}

/** Text together, no empty text. */
export function scTokenValueNormalize(
  value: ScTokenInputValue,
): ScTokenInputValue {
  const parts: (string | ScToken)[] = [];
  for (const part of value) {
    if (typeof part === 'string') {
      if (!part) continue;
      const last = parts[parts.length - 1];
      if (typeof last === 'string') parts[parts.length - 1] = last + part;
      else parts.push(part);
    } else {
      parts.push(part);
    }
  }
  return parts;
}

/** Its length: a character each, a token one. */
export function scTokenValueLength(value: ScTokenInputValue): number {
  let length = 0;
  for (const part of value)
    length += typeof part === 'string' ? part.length : 1;
  return length;
}

/** From `start` to `end` (a character each, a token one). */
export function scTokenValueSlice(
  value: ScTokenInputValue,
  start: number,
  end = Infinity,
): ScTokenInputValue {
  const parts: (string | ScToken)[] = [];
  let at = 0;
  for (const part of value) {
    const length = typeof part === 'string' ? part.length : 1;
    const from = Math.max(start - at, 0);
    const to = Math.min(end - at, length);
    if (from < to)
      parts.push(typeof part === 'string' ? part.slice(from, to) : part);
    at += length;
  }
  return parts;
}

/** `start` to `end` replaced with `insert`. */
export function scTokenValueSplice(
  value: ScTokenInputValue,
  start: number,
  end: number,
  insert: ScTokenInputValue,
): ScTokenInputValue {
  return scTokenValueNormalize([
    ...scTokenValueSlice(value, 0, start),
    ...insert,
    ...scTokenValueSlice(value, end),
  ]);
}

/** What is at `offset`: a character, a token, or nothing. */
export function scTokenValueAt(
  value: ScTokenInputValue,
  offset: number,
): string | ScToken | undefined {
  return scTokenValueSlice(value, offset, offset + 1)[0];
}

/** Its text, each token one object character (U+FFFC): to search it. */
export function scTokenValueFlat(value: ScTokenInputValue): string {
  return value.map((part) => (typeof part === 'string' ? part : '￼')).join('');
}

/** Its tokens. */
export function scTokenValueTokens(value: ScTokenInputValue): ScToken[] {
  return value.filter((part): part is ScToken => typeof part !== 'string');
}

/** The same text and the same tokens. */
export function scTokenValueEqual(
  a: ScTokenInputValue,
  b: ScTokenInputValue,
): boolean {
  return a.length === b.length && a.every((part, i) => part === b[i]);
}

const DEFAULT_PATTERN =
  /\[@((?:[^\]\\]|\\.)*)\]\(([^:()\s]+):((?:[^()\\]|\\.)*)\)/g;
const escape = (text: string, chars: RegExp) =>
  text.replace(chars, (char) => `\\${char}`);
const unescape = (text: string) => text.replace(/\\(.)/g, '$1');

/** `[@label](type:value)`, as in Markdown. */
export const scTokenCodec: ScTokenCodec = {
  format: (token) =>
    `[@${escape(token.label, /[\]\\]/g)}](${token.type}:${escape(token.value, /[()\\]/g)})`,
  parse: (text) => {
    const parts: (string | ScToken)[] = [];
    let at = 0;
    for (const match of text.matchAll(DEFAULT_PATTERN)) {
      parts.push(text.slice(at, match.index));
      parts.push({
        label: unescape(match[1]),
        type: match[2],
        value: unescape(match[3]),
      });
      at = match.index + match[0].length;
    }
    parts.push(text.slice(at));
    return scTokenValueNormalize(parts);
  },
};

/** The value as text, each token as the codec writes it. */
export function tokenInputToText(
  value: ScTokenInputValue,
  codec: ScTokenCodec = scTokenCodec,
): string {
  return value
    .map((part) => (typeof part === 'string' ? part : codec.format(part)))
    .join('');
}

/** A value from text the codec wrote. */
export function tokenInputFromText(
  text: string,
  codec: ScTokenCodec = scTokenCodec,
): ScTokenInputValue {
  return scTokenValueNormalize(codec.parse(text));
}

/** The value as it reads: each token its label. */
export function tokenInputToLabel(value: ScTokenInputValue): string {
  return value
    .map((part) => (typeof part === 'string' ? part : part.label))
    .join('');
}
