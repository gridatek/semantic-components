// Builder
export { createParser } from './query-param-builder';

// Parsers
export {
  parseAsArrayOf,
  parseAsBoolean,
  parseAsFloat,
  parseAsInteger,
  parseAsIsoDate,
  parseAsIsoDateTime,
  parseAsJson,
  parseAsString,
  parseAsStringEnum,
  parseAsTimestamp,
} from './query-param-parsers';

// Injection functions
export { injectQueryParam } from './inject-query-param';
export { injectQueryParams } from './inject-query-params';

// Types
export type {
  ScInferParserMapSetAll,
  ScInferParserMapValues,
  ScParserMap,
  ScQueryParamsState,
} from './inject-query-params';
export type {
  ScParser,
  ScParserBuilder,
  ScParserBuilderWithDefault,
  ScQueryParamOptions,
  ScQueryParamState,
} from './query-param-types';
