import { DestroyRef, WritableSignal, inject, signal } from '@angular/core';
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

  // Subscribe to route changes and keep signal in sync
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

  return {
    value: sig as WritableSignal<T>,

    set(value: T | null): void {
      const raw = value === null ? null : parser.serialize(value);
      sync.write(key, raw, parser._options);
      // Optimistic local update for instant UI response
      sig.set(value ?? defaultValue);
    },

    clear(): void {
      sync.write(key, null, parser._options);
      sig.set(defaultValue);
    },
  };
}
