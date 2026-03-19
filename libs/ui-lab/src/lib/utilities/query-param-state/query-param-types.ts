import type { WritableSignal } from '@angular/core';

export interface Parser<T> {
  parse(raw: string): T | null;
  serialize(value: T): string;
}

export interface QueryParamOptions {
  /** 'replace' (default) or 'push' — controls browser history behaviour */
  history?: 'replace' | 'push';
}

export interface ParserBuilder<T> extends Parser<T> {
  withDefault(defaultValue: T): ParserBuilderWithDefault<T>;
  withOptions(opts: QueryParamOptions): ParserBuilder<T>;
  _options?: QueryParamOptions;
  _default?: undefined;
}

export interface ParserBuilderWithDefault<T> extends Parser<T> {
  withOptions(opts: QueryParamOptions): ParserBuilderWithDefault<T>;
  _options?: QueryParamOptions;
  _default: T;
}

export interface QueryParamState<T> {
  /** Signal holding the current parsed value (or default / null). */
  value: WritableSignal<T>;
  /**
   * Set the query param.
   * Pass `null` to remove the key from the URL entirely.
   */
  set(value: T | null): void;
  /** Remove the param from the URL (same as set(null)). */
  clear(): void;
}
