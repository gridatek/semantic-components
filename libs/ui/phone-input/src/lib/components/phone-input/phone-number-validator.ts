import {
  type PathKind,
  type SchemaPath,
  type SchemaPathRules,
  validate,
} from '@angular/forms/signals';
import { isPossiblePhoneNumber, isValidPhoneNumber } from 'libphonenumber-js';

/**
 * A Signal Forms rule: the value is a phone number (empty passes — add
 * `required` for that). By default its length fits its country (the check
 * react-phone-number-input recommends: numbering plans change, a stricter
 * check can refuse real numbers); `strict`, its digits too.
 */
export function phoneNumber<TPathKind extends PathKind = PathKind.Root>(
  path: SchemaPath<string, SchemaPathRules.Supported, TPathKind>,
  config?: { strict?: boolean; message?: string },
): void {
  validate(path, ({ value }) => {
    const number = value();
    if (!number) return undefined;
    const ok = config?.strict
      ? isValidPhoneNumber(number)
      : isPossiblePhoneNumber(number);
    return ok ? undefined : { kind: 'phoneNumber', message: config?.message };
  });
}
