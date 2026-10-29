/** What a value is, for its colour and how it is shown. */
export type ScJsonViewerKind =
  | 'object'
  | 'array'
  | 'range'
  | 'string'
  | 'number'
  | 'bigint'
  | 'boolean'
  | 'null'
  | 'undefined'
  | 'date'
  | 'other';

/** A row of the viewer: a key and its value, or a range of a long array. */
export interface ScJsonViewerNode {
  /** Unique: the path to it, `user.roles[2]`; a range's ends after it. */
  readonly path: string;
  /** Its key or index; `null` for the value at the top. */
  readonly key: string | null;
  readonly kind: ScJsonViewerKind;
  readonly value: unknown;
  /** Its depth, from 1. */
  readonly depth: number;
  /** An object's keys, an array's items, a range's items. */
  readonly size: number;
  /** A range's first and last index. */
  readonly range?: readonly [number, number];
}

/** A long array's items, by groups of this many. */
export const RANGE_SIZE = 100;

export function kindOf(value: unknown): ScJsonViewerKind {
  if (value === null) return 'null';
  if (Array.isArray(value)) return 'array';
  switch (typeof value) {
    case 'string':
      return 'string';
    case 'number':
      return 'number';
    case 'bigint':
      return 'bigint';
    case 'boolean':
      return 'boolean';
    case 'undefined':
      return 'undefined';
    case 'object': {
      const tag = Object.prototype.toString.call(value);
      if (tag === '[object Date]' || tag.startsWith('[object Temporal.'))
        return 'date';
      return Object.getPrototypeOf(value) === Object.prototype ||
        Object.getPrototypeOf(value) === null
        ? 'object'
        : 'other';
    }
    default:
      return 'other';
  }
}

export const isExpandable = (node: ScJsonViewerNode) =>
  (node.kind === 'object' || node.kind === 'array' || node.kind === 'range') &&
  node.size > 0;

/** A key in a path: `.name`, or `["a key"]` when it isn't an identifier. */
function keyPath(parent: string, key: string): string {
  return /^[A-Za-z_$][\w$]*$/.test(key)
    ? parent
      ? `${parent}.${key}`
      : key
    : `${parent}[${JSON.stringify(key)}]`;
}

export function nodeOf(
  value: unknown,
  key: string | null,
  path: string,
  depth: number,
): ScJsonViewerNode {
  const kind = kindOf(value);
  const size =
    kind === 'array'
      ? (value as unknown[]).length
      : kind === 'object'
        ? Object.keys(value as object).length
        : 0;
  return { path, key, kind, value, depth, size };
}

/** A node's children: an object's keys, an array's items — or its ranges, when long. */
export function childrenOf(
  node: ScJsonViewerNode,
  sortKeys: boolean,
): ScJsonViewerNode[] {
  const depth = node.depth + 1;
  if (node.kind === 'object') {
    const keys = Object.keys(node.value as object);
    if (sortKeys) keys.sort((a, b) => a.localeCompare(b));
    return keys.map((key) =>
      nodeOf(
        (node.value as Record<string, unknown>)[key],
        key,
        keyPath(node.path, key),
        depth,
      ),
    );
  }
  if (node.kind === 'array' || node.kind === 'range') {
    const items = node.value as unknown[];
    const [from, to] = node.range ?? [0, items.length - 1];
    const count = to - from + 1;
    if (node.kind === 'array' && count > RANGE_SIZE) {
      const ranges: ScJsonViewerNode[] = [];
      for (let start = from; start <= to; start += RANGE_SIZE) {
        const end = Math.min(start + RANGE_SIZE - 1, to);
        ranges.push({
          path: `${node.path}[${start}…${end}]`,
          key: `[${start} … ${end}]`,
          kind: 'range',
          value: items,
          depth,
          size: end - start + 1,
          range: [start, end],
        });
      }
      return ranges;
    }
    const parent =
      node.kind === 'range'
        ? node.path.slice(0, node.path.lastIndexOf('['))
        : node.path;
    const children: ScJsonViewerNode[] = [];
    for (let index = from; index <= to; index++)
      children.push(
        nodeOf(items[index], String(index), `${parent}[${index}]`, depth),
      );
    return children;
  }
  return [];
}

/** The text a value is copied as: a string itself, anything else as JSON. */
export function copyText(node: ScJsonViewerNode): string {
  if (node.kind === 'string') return node.value as string;
  if (node.kind === 'bigint') return String(node.value);
  if (node.kind === 'undefined') return 'undefined';
  if (node.kind === 'range') {
    const [from, to] = node.range ?? [0, 0];
    return JSON.stringify(
      (node.value as unknown[]).slice(from, to + 1),
      null,
      2,
    );
  }
  if (node.kind === 'date') return dateText(node.value);
  if (node.kind === 'other') return String(node.value);
  return JSON.stringify(node.value, null, 2);
}

/** A date as JSON would write it (ISO 8601): `Date` and Temporal both have `toJSON`. */
export function dateText(value: unknown): string {
  const toJSON = (value as { toJSON?: () => string }).toJSON;
  return typeof toJSON === 'function' ? toJSON.call(value) : String(value);
}
