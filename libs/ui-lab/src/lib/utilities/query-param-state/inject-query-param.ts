import {
  DestroyRef,
  WritableSignal,
  debounced,
  effect,
  inject,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
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
  const route = inject(ActivatedRoute);
  const destroyRef = inject(DestroyRef);

  const hasDefault = '_default' in parser && parser._default !== undefined;
  const defaultValue: T | null = hasDefault
    ? (parser as ParserBuilderWithDefault<T>)._default
    : null;

  // Read initial value from URL snapshot
  const rawInit = sync.getRaw(key);
  const initialParsed = rawInit !== null ? parser.parse(rawInit) : null;
  const initialValue: T | null = initialParsed ?? defaultValue;

  const sig = signal<T | null>(initialValue);

  const isDefault = (value: T | null): boolean => {
    if (!hasDefault || value === null || defaultValue === null) return false;
    return parser.serialize(value) === parser.serialize(defaultValue);
  };

  // If the URL carries the default value explicitly, strip it so the canonical
  // URL only ever contains non-default state.
  if (rawInit !== null && initialParsed !== null && isDefault(initialParsed)) {
    sync.write(key, null, parser._options);
  }

  // External URL changes (back/forward, manual edits) flow into the signal.
  route.queryParamMap
    .pipe(takeUntilDestroyed(destroyRef))
    .subscribe((params) => {
      const raw = params.has(key) ? params.get(key) : null;
      if (raw === null) {
        sig.set(defaultValue);
      } else {
        const parsed = parser.parse(raw);
        sig.set(parsed ?? defaultValue);
      }
    });

  const debounceMs = parser._options?.debounceMs ?? 0;
  const debouncedView = debounceMs > 0 ? debounced(sig, debounceMs) : null;
  const read = debouncedView ? () => debouncedView.value() : () => sig();

  // The signal is the write origin: `set`/`clear` only touch the signal, and
  // this effect projects it onto the URL. The URL round-trips back in via the
  // queryParamMap subscription above, so this is a cycle — it converges because
  // a write is skipped when the serialised value already matches the live URL.
  // That guard is required, not an optimisation: parsers returning reference
  // types (parseAsJson, parseAsArrayOf, the Date parsers) hand back a fresh
  // object on every navigation, which re-notifies the signal and re-runs this
  // effect. Without the guard each write would trigger the next.
  let firstRun = true;
  effect(() => {
    const value = read();
    if (firstRun) {
      firstRun = false;
      return;
    }
    const raw =
      value === null || isDefault(value) ? null : parser.serialize(value);
    if (raw === sync.getRaw(key)) return;
    sync.write(key, raw, parser._options);
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
