import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { injectQueryParam } from './inject-query-param';
import type {
  ParserBuilder,
  ParserBuilderWithDefault,
  QueryParamOptions,
  QueryParamState,
} from './query-param-types';

export type ParserMap = Record<
  string,
  ParserBuilder<unknown> | ParserBuilderWithDefault<unknown>
>;

export type InferParserMapValues<M extends ParserMap> = {
  [K in keyof M]: M[K] extends ParserBuilderWithDefault<infer T>
    ? QueryParamState<T>
    : M[K] extends ParserBuilder<infer T>
      ? QueryParamState<T | null>
      : never;
};

export type InferParserMapSetAll<M extends ParserMap> = {
  [K in keyof M]?: M[K] extends ParserBuilderWithDefault<infer T>
    ? T | null
    : M[K] extends ParserBuilder<infer T>
      ? T | null
      : never;
};

export type QueryParamsState<M extends ParserMap> = InferParserMapValues<M> & {
  /** Update multiple params at once in a single navigation call. */
  setAll(values: InferParserMapSetAll<M>, opts?: QueryParamOptions): void;
  /** Remove all managed params from the URL. */
  clearAll(): void;
};

/**
 * `injectQueryParams` — manage multiple query params at once.
 *
 * @example
 * ```ts
 * const filters = injectQueryParams({
 *   q:    parseAsString.withDefault(''),
 *   page: parseAsInteger.withDefault(1),
 *   sort: parseAsStringEnum(['asc', 'desc'] as const).withDefault('asc'),
 * });
 *
 * filters.q.value()    // string
 * filters.page.value() // number
 * filters.setAll({ q: 'angular', page: 1 }); // batch update
 * ```
 */
export function injectQueryParams<M extends ParserMap>(
  parserMap: M,
): QueryParamsState<M> {
  const router = inject(Router);

  // Inject each param individually
  const states = {} as InferParserMapValues<M>;
  for (const key of Object.keys(parserMap) as (keyof M & string)[]) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (states as any)[key] = injectQueryParam(key, parserMap[key] as any);
  }

  function setAll(
    values: InferParserMapSetAll<M>,
    opts?: QueryParamOptions,
  ): void {
    const current = router.parseUrl(router.url);
    const qp = { ...current.queryParams };

    for (const key of Object.keys(values) as (keyof M & string)[]) {
      const parser = parserMap[key];
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const val = (values as any)[key];
      if (val === null || val === undefined) {
        delete qp[key];
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (states as any)[key].value.set(
          '_default' in parser
            ? (parser as ParserBuilderWithDefault<unknown>)._default
            : null,
        );
      } else {
        qp[key] = parser.serialize(val);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (states as any)[key].value.set(val);
      }
    }

    router.navigate([], {
      queryParams: qp,
      replaceUrl: (opts?.history ?? 'replace') === 'replace',
    });
  }

  function clearAll(): void {
    const patch: InferParserMapSetAll<M> = {};
    for (const key of Object.keys(parserMap) as (keyof M & string)[]) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (patch as any)[key] = null;
    }
    setAll(patch);
  }

  return { ...states, setAll, clearAll } as QueryParamsState<M>;
}
