import type {
  ParserBuilder,
  ParserBuilderWithDefault,
  QueryParamOptions,
} from './query-param-types';

export function createParser<T>(
  parse: (raw: string) => T | null,
  serialize: (value: T) => string,
  opts?: QueryParamOptions,
): ParserBuilder<T> {
  const builder: ParserBuilder<T> = {
    parse,
    serialize,
    _options: opts,
    withDefault(defaultValue: T): ParserBuilderWithDefault<T> {
      return {
        parse,
        serialize,
        _default: defaultValue,
        _options: opts,
        withOptions(newOpts: QueryParamOptions): ParserBuilderWithDefault<T> {
          return { ...this, _options: { ...opts, ...newOpts } };
        },
      };
    },
    withOptions(newOpts: QueryParamOptions): ParserBuilder<T> {
      return createParser(parse, serialize, { ...opts, ...newOpts });
    },
  };
  return builder;
}
