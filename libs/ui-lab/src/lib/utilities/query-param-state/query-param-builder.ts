import type {
  ScParserBuilder,
  ScParserBuilderWithDefault,
  ScQueryParamOptions,
} from './query-param-types';

export function createParser<T>(
  parse: (raw: string) => T | null,
  serialize: (value: T) => string,
  opts?: ScQueryParamOptions,
): ScParserBuilder<T> {
  const builder: ScParserBuilder<T> = {
    parse,
    serialize,
    _options: opts,
    withDefault(defaultValue: T): ScParserBuilderWithDefault<T> {
      return {
        parse,
        serialize,
        _default: defaultValue,
        _options: opts,
        withOptions(
          newOpts: ScQueryParamOptions,
        ): ScParserBuilderWithDefault<T> {
          return { ...this, _options: { ...opts, ...newOpts } };
        },
      };
    },
    withOptions(newOpts: ScQueryParamOptions): ScParserBuilder<T> {
      return createParser(parse, serialize, { ...opts, ...newOpts });
    },
  };
  return builder;
}
