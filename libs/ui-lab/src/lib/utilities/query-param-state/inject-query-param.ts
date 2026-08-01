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

  const parseRaw = (value: string | null): T | null =>
    value === null ? defaultValue : (parser.parse(value) ?? defaultValue);

  const serializeValue = (value: T | null): string | null =>
    value === null || isDefault(value) ? null : parser.serialize(value);

  // Typed view of the shared raw value. External changes (back/forward,
  // hand-edited links, another call site) reset it through `source`; local
  // writes are intercepted by `set` and published to the shared raw value
  // synchronously, so sibling call sites for the same key observe them in the
  // same statement rather than on the next change detection. The URL write
  // stays debounced downstream, independently of this.
  const sig = linkedSignal<string | null, T | null>({
    source: raw,
    computation: (value) => parseRaw(value),
    set: (value, rawSet) => {
      const next = serializeValue(value);
      if (next !== untracked(raw)) {
        // Changing the source re-runs `computation`, which canonicalises the
        // value: page.set(3.7) with parseAsInteger settles on 3.
        raw.set(next);
      } else {
        rawSet(parseRaw(next));
      }
    },
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
