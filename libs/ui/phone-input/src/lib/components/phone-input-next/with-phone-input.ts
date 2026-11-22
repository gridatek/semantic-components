import { InjectionToken } from '@angular/core';
import { type ScFeature, makeScFeature } from '@semantic-components/ui';

/** The phone input's settings, for the whole app. */
export interface ScPhoneInputConfig {
  /**
   * Where the flags are: `{XX}` (or `{xx}`) is the country's code —
   * `'/flags/{XX}.svg'`. Serve them with your app (country-flag-icons' 3x2
   * SVGs, copied by your build's assets); none set, no flag is shown.
   */
  readonly flagUrl?: string;
}

export const SC_PHONE_INPUT_CONFIG = new InjectionToken<ScPhoneInputConfig>(
  'SC_PHONE_INPUT_CONFIG',
  { factory: () => ({}) },
);

/**
 * The phone input's settings, given once:
 * `provideSemanticComponents({}, withPhoneInput({ flagUrl: '/flags/{XX}.svg' }))`.
 */
export function withPhoneInput(
  config: ScPhoneInputConfig,
): ScFeature<'phoneInput'> {
  return makeScFeature('phoneInput', [
    { provide: SC_PHONE_INPUT_CONFIG, useValue: config },
  ]);
}
