import { createParser } from './query-param-builder';
import type { Parser, ParserBuilder } from './query-param-types';

/** Stores a plain string value. */
export const parseAsString = createParser<string>(
  (raw) => raw,
  (v) => v,
);

/** Parses to a JavaScript integer (base-10). */
export const parseAsInteger = createParser<number>(
  (raw) => {
    const n = parseInt(raw, 10);
    return isNaN(n) ? null : n;
  },
  (v) => String(Math.trunc(v)),
);

/** Parses to a JavaScript float. */
export const parseAsFloat = createParser<number>(
  (raw) => {
    const n = parseFloat(raw);
    return isNaN(n) ? null : n;
  },
  (v) => String(v),
);

/** Parses 'true' / 'false' strings to booleans. */
export const parseAsBoolean = createParser<boolean>(
  (raw) => {
    if (raw === 'true') return true;
    if (raw === 'false') return false;
    return null;
  },
  (v) => (v ? 'true' : 'false'),
);

/**
 * Parses an ISO-8601 date-time string (e.g. 2024-03-01T12:00:00.000Z).
 * Serialises back with `.toISOString()`.
 */
export const parseAsIsoDateTime = createParser<Date>(
  (raw) => {
    const d = new Date(raw);
    return isNaN(d.getTime()) ? null : d;
  },
  (v) => v.toISOString(),
);

/**
 * Parses an ISO-8601 date string (e.g. 2024-03-01).
 * Time is set to 00:00:00 UTC.
 */
export const parseAsIsoDate = createParser<Date>(
  (raw) => {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(raw)) return null;
    const d = new Date(`${raw}T00:00:00.000Z`);
    return isNaN(d.getTime()) ? null : d;
  },
  (v) => v.toISOString().slice(0, 10),
);

/** Parses milliseconds since Unix epoch. */
export const parseAsTimestamp = createParser<Date>(
  (raw) => {
    const n = parseInt(raw, 10);
    if (isNaN(n)) return null;
    const d = new Date(n);
    return isNaN(d.getTime()) ? null : d;
  },
  (v) => String(v.getTime()),
);

/**
 * Parses a JSON-encoded value.
 * Pass a validator/reviver if you want runtime validation (e.g. Zod).
 *
 * @example
 * const parseAsFilter = parseAsJson<{ active: boolean }>();
 * const filter = injectQueryParam('filter', parseAsFilter.withDefault({ active: false }));
 */
export function parseAsJson<T>(
  validate?: (raw: unknown) => T,
): ParserBuilder<T> {
  return createParser<T>(
    (raw) => {
      try {
        const parsed = JSON.parse(raw) as unknown;
        return validate ? validate(parsed) : (parsed as T);
      } catch {
        return null;
      }
    },
    (v) => JSON.stringify(v),
  );
}

/**
 * Parses a comma-separated (or custom separator) list of values using another parser.
 *
 * @example
 * const parseAsTags = parseAsArrayOf(parseAsString);
 * const tags = injectQueryParam('tags', parseAsTags.withDefault([]));
 */
export function parseAsArrayOf<T>(
  itemParser: Parser<T>,
  separator = ',',
): ParserBuilder<T[]> {
  return createParser<T[]>(
    (raw) => {
      if (raw === '') return [];
      const parts = raw.split(separator);
      const results: T[] = [];
      for (const part of parts) {
        const parsed = itemParser.parse(part.trim());
        if (parsed === null) return null;
        results.push(parsed);
      }
      return results;
    },
    (v) => v.map((item) => itemParser.serialize(item)).join(separator),
  );
}

/**
 * Restricts a string param to a set of allowed enum values.
 *
 * @example
 * const parseAsSort = parseAsStringEnum(['asc', 'desc'] as const);
 * const sort = injectQueryParam('sort', parseAsSort.withDefault('asc'));
 */
export function parseAsStringEnum<T extends string>(
  values: readonly T[],
): ParserBuilder<T> {
  return createParser<T>(
    (raw) => (values.includes(raw as T) ? (raw as T) : null),
    (v) => v,
  );
}
