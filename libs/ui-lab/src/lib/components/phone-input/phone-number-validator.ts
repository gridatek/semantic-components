import {
  type PathKind,
  type SchemaPath,
  type SchemaPathRules,
  validate,
} from '@angular/forms/signals';
import { isValidPhoneNumber } from 'libphonenumber-js';

/**
 * Signal Forms rule: the value, if not empty, is a valid phone number in
 * international form (`+33612345678`) — what `scPhoneInput` produces. Use
 * with `required()` to also refuse an empty value.
 */
export function phoneNumber<TPathKind extends PathKind = PathKind.Root>(
  path: SchemaPath<string, SchemaPathRules.Supported, TPathKind>,
  config?: { message?: string },
): void {
  validate(path, ({ value }) => {
    const number = value();
    if (!number || isValidPhoneNumber(number)) return undefined;
    return {
      kind: 'phoneNumber',
      message: config?.message ?? 'Enter a valid phone number',
    };
  });
}
