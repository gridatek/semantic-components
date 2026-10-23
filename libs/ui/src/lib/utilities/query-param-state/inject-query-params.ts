import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { injectQueryParam } from './inject-query-param';
import type {
  ScParserBuilder,
  ScParserBuilderWithDefault,
  ScQueryParamOptions,
  ScQueryParamState,
} from './query-param-types';

export type ScParserMap = Record<
  string,
  ScParserBuilder<unknown> | ScParserBuilderWithDefault<unknown>
>;

export type ScInferParserMapValues<M extends ScParserMap> = {
  [K in keyof M]: M[K] extends ScParserBuilderWithDefault<infer T>
    ? ScQueryParamState<T>
    : M[K] extends ScParserBuilder<infer T>
      ? ScQueryParamState<T | null>
      : never;
};

export type ScInferParserMapSetAll<M extends ScParserMap> = {
  [K in keyof M]?: M[K] extends ScParserBuilderWithDefault<infer T>
    ? T | null
    : M[K] extends ScParserBuilder<infer T>
      ? T | null
      : never;
};

export type ScQueryParamsState<M extends ScParserMap> =
  ScInferParserMapValues<M> & {
    /** Update multiple params at once in a single navigation call. */
    setAll(values: ScInferParserMapSetAll<M>, opts?: ScQueryParamOptions): void;
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
export function injectQueryParams<M extends ScParserMap>(
  parserMap: M,
): ScQueryParamsState<M> {
  const router = inject(Router);

  // Inject each param individually
  const states = {} as ScInferParserMapValues<M>;
  for (const key of Object.keys(parserMap) as (keyof M & string)[]) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (states as any)[key] = injectQueryParam(key, parserMap[key] as any);
  }

  function setAll(
    values: ScInferParserMapSetAll<M>,
    opts?: ScQueryParamOptions,
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
            ? (parser as ScParserBuilderWithDefault<unknown>)._default
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
    const patch: ScInferParserMapSetAll<M> = {};
    for (const key of Object.keys(parserMap) as (keyof M & string)[]) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (patch as any)[key] = null;
    }
    setAll(patch);
  }

  return { ...states, setAll, clearAll } as ScQueryParamsState<M>;
}
