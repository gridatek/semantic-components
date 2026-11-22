/** A suggestion: what it inserts (a token of its trigger's type) and shows. */
export interface ScTriggerItem {
  /** The token's value (an id, a path). */
  readonly value: string;
  /** Shown, matched, and the token's label. */
  readonly label: string;
  /** More words it is found by. */
  readonly keywords?: readonly string[];
  readonly disabled?: boolean;
}

/** Items for what is typed, loaded (aborted when the query changes). */
export type ScTriggerItemsLoader<T extends ScTriggerItem = ScTriggerItem> = (
  query: string,
  signal: AbortSignal,
) => Promise<readonly T[]>;

/** A character that opens the menu, and what it suggests. */
export interface ScTrigger<T extends ScTriggerItem = ScTriggerItem> {
  /** `@`, `/`, `#`… */
  readonly char: string;
  /** The type of the tokens it inserts. */
  readonly type: string;
  /** Its items — filtered by what is typed — or a loader given it. */
  readonly items: readonly T[] | ScTriggerItemsLoader<T>;
  /**
   * Where the character opens the menu: after a space, a token or a line's
   * start (`word`); only at the start of the text or a line (`start`).
   */
  readonly boundary?: 'word' | 'start';
  /**
   * In a textarea or input: the text an item puts in (a space follows). The
   * trigger and the label by default (`@Hollis Grant`). A Token Input puts
   * a token.
   */
  readonly insert?: (item: T) => string;
}

/** A trigger typed: from where to the caret, and what follows it. */
export interface ScTriggerMatch<T extends ScTriggerItem = ScTriggerItem> {
  readonly trigger: ScTrigger<T>;
  readonly start: number;
  readonly end: number;
  readonly query: string;
}
