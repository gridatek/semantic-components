import { type ScFeature, makeScFeature } from '@semantic-components/ui';
import { SC_I18N_CONFIG, type ScI18nConfig } from './i18n-config';

/**
 * The app's locales, for `ScI18n` (your switcher reads it):
 * `provideSemanticComponents({ preset }, withI18n(I18N))` — the same config
 * `loadLocale()` is given in `main.ts`.
 */
export function withI18n(config: ScI18nConfig): ScFeature<'i18n'> {
  return makeScFeature('i18n', [{ provide: SC_I18N_CONFIG, useValue: config }]);
}
