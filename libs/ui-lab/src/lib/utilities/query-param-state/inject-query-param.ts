import {
  WritableSignal,
  debounced,
  effect,
  inject,
  linkedSignal,
  untracked,
} from '@angular/core';
import { QueryParamSyncService } from './query-param-sync';
import type {
  ParserBuilder,
  ParserBuilderWithDefault,
  QueryParamState,
} from './query-param-types';

/**
 * `injectQueryParam` — nuqs-style, signal-based URL query param hook for Angular.
 *
 * Must be called in an injection context (constructor, field initialiser, or
 * inside `runInInjectionContext`).
 *
 * @example — no default (nullable)
 * ```ts
 * const name = injectQueryParam('name', parseAsString);
 * name.value() // string | null
 * name.set('Alice');
 * name.clear(); // removes ?name from URL
 * ```
 *
 * @example — with default (never null)
 * ```ts
 * const page = injectQueryParam('page', parseAsInteger.withDefault(1));
 * page.value() // number
 * page.set(2);
 * ```
 */
export function injectQueryParam<T>(
  key: string,
  parser: ParserBuilderWithDefault<T>,
): QueryParamState<T>;
export function injectQueryParam<T>(
  key: string,
  parser: ParserBuilder<T>,
): QueryParamState<T | null>;
export function injectQueryParam<T>(
  key: string,
  parser: ParserBuilder<T> | ParserBuilderWithDefault<T>,
): QueryParamState<T | null> {
  const sync = inject(QueryParamSyncService);

  const hasDefault = '_default' in parser && parser._default !== undefined;
  const defaultValue: T | null = hasDefault
    ? (parser as ParserBuilderWithDefault<T>)._default
    : null;

  // Shared per-key raw value. Every call site for `key` observes this same
  // signal, and the service keeps it current from a single route subscription.
  const raw = sync.raw(key);

  const isDefault = (value: T | null): boolean => {
    if (!hasDefault || value === null || defaultValue === null) return false;
    return parser.serialize(value) === parser.serialize(defaultValue);
  };

  // If the URL carries the default value explicitly, strip it so the canonical
  // URL only ever contains non-default state.
  const rawInit = untracked(raw);
  const initialParsed = rawInit !== null ? parser.parse(rawInit) : null;
  if (rawInit !== null && initialParsed !== null && isDefault(initialParsed)) {
    sync.write(key, null, parser._options);
  }

  // Typed view of the shared raw value, locally writable so `set` can update
  // optimistically before the URL catches up. External changes (back/forward,
  // hand-edited links, a sibling call site) reset it through `source`.
  const sig = linkedSignal<string | null, T | null>({
    source: raw,
    computation: (value) =>
      value === null ? defaultValue : (parser.parse(value) ?? defaultValue),
  });

  // Local writes publish to the shared raw value immediately, so sibling call
  // sites for the same key converge in this tick rather than waiting on the URL
  // round-trip — which `debounceMs` can defer for as long as the user keeps
  // typing. No "skip the first run" guard here: `raw` is seeded from the URL,
  // so the initial pass is already a no-op by equality, and skipping a run by
  // counter would swallow a write made before the first change detection.
  effect(() => {
    const value = sig();
    const next =
      value === null || isDefault(value) ? null : parser.serialize(value);
    if (next !== untracked(raw)) raw.set(next);
  });

  // The URL is a projection of the shared raw value, optionally debounced. The
  // write is skipped when it already matches the live URL: that guard is what
  // stops the URL → signal → URL cycle from sustaining itself.
  const debounceMs = parser._options?.debounceMs ?? 0;
  const debouncedRaw = debounceMs > 0 ? debounced(raw, debounceMs) : null;
  const readRaw = debouncedRaw ? () => debouncedRaw.value() : () => raw();

  effect(() => {
    const next = readRaw();
    if (next === sync.getRaw(key)) return;
    sync.write(key, next, parser._options);
  });

  return {
    value: sig as WritableSignal<T>,

    set(value: T | null): void {
      sig.set(value ?? defaultValue);
    },

    clear(): void {
      sig.set(defaultValue);
    },
  };
}
