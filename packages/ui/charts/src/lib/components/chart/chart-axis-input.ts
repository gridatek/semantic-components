import { booleanAttribute } from '@angular/core';

/** An axis's `reversed`: a boolean attribute that can stay unset (the chart's default). */
export const optionalBoolean = (
  value: boolean | string | null | undefined,
): boolean | undefined =>
  value === undefined || value === null ? undefined : booleanAttribute(value);
